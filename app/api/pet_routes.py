from flask import Blueprint, request, jsonify
from app.models import Pet, db
from app.forms import PetForm
from flask_login import current_user, login_user, logout_user, login_required
from .AWS_helpers import upload_file_to_s3, remove_file_from_s3, get_unique_filename

pet_routes = Blueprint('pets', __name__)

#GET USER PETS


#CREATE PET
@pet_routes.route('/create', methods=['POST'])
def create_pet():
    form = PetForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        image = form.data['pet_pic']
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)
        new_pet = Pet(
            name=form.data['name'],
            pet_pic=upload['url'],
            birthday=form.data['birthday'],
            breed=form.data['breed'],
            special_requests=form.data['special_requests']
        )
        db.session.add(new_pet)
        db.session.commit()
        return new_pet.to_dict()
    print(form.errors)
    return form.errors, 401
