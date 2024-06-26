from flask import Blueprint, request, jsonify
from app.models import Pet, db
from app.forms import PetForm
from datetime import datetime
from flask_login import current_user, login_user, logout_user, login_required
from .AWS_helpers import upload_file_to_s3, remove_file_from_s3, get_unique_filename

pet_routes = Blueprint('pets', __name__)

#GET ALL PETS
@pet_routes.route('/all')
def pets():
    pets = Pet.query.all()
    return {'pets': [pet.to_dict() for pet in pets]}

#GET PET BY ID
@pet_routes.route('/<int:pet_id>')
def pet_by_id(pet_id):
    pet = Pet.query.get(pet_id)
    return pet.to_dict()

#CREATE PET
@pet_routes.route('/create', methods=['POST'])
@login_required
def create_pet():
    form = PetForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if form.data['pet_pic']:
            image = form.data['pet_pic']
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            image_url = upload['url']
        else:
            image_url = 'https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png'

        birthday = datetime.strptime(form.data['birthday'], '%Y-%m-%d')

        new_pet = Pet(
            name=form.data['name'],
            pet_pic=image_url,
            birthday=birthday,
            breed=form.data['breed'],
            special_requests=form.data['special_requests'],
            home_address_id=form.data['home_address_id'] or None,
            owner_id=current_user.id
        )
        db.session.add(new_pet)
        db.session.commit()
        return new_pet.to_dict()
    print(form.errors)
    return form.errors, 400

#UPDATE PET
@pet_routes.route('/<int:pet_id>/update', methods=['POST'])
@login_required
def update_pet(pet_id):
    pet_to_edit = Pet.query.get(pet_id)

    if pet_to_edit.owner_id == current_user.id:
        form = PetForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            if form.data['pet_pic']:
                image = form.data['pet_pic']
                image.filename = get_unique_filename(image.filename)
                upload = upload_file_to_s3(image)
                pet_picture = upload['url']
            else:
                pet_picture = pet_to_edit.pet_pic

            birthday = datetime.strptime(form.data['birthday'], '%Y-%m-%d')

            pet_to_edit.name = form.name.data
            pet_to_edit.pet_pic = pet_picture
            pet_to_edit.birthday = birthday
            pet_to_edit.breed = form.breed.data
            pet_to_edit.special_requests = form.special_requests.data
            pet_to_edit.home_address_id = form.home_address_id.data or None

            db.session.commit()

            return pet_to_edit.to_dict()

        return form.errors, 400
    return {'error': 'Unauthorized'}, 401

#DELETE PET
@pet_routes.route("/<int:pet_id>/delete", methods=['DELETE'])
@login_required
def delete_pet(pet_id):
    pet_to_delete = Pet.query.get(pet_id)
    if pet_to_delete.pet_pic != 'https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png':
        file_to_delete = remove_file_from_s3(pet_to_delete.pet_pic)
    if not pet_to_delete:
        return jsonify({"message": "pet couldn't be found"}), 404
    db.session.delete(pet_to_delete)
    db.session.commit()
    return jsonify({"message": "Successfully deleted"}), 200
