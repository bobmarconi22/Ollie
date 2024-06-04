from flask import Blueprint, request, jsonify
from app.models import Address, Pet, db
from app.forms import AddressForm
from datetime import datetime
from flask_login import current_user, login_user, logout_user, login_required

address_routes = Blueprint('addresses', __name__)


#CREATE ADDRESS
@address_routes.route('/create', methods=['POST'])
@login_required
def create_address():
    body = request.get_json()

    form = AddressForm(data=body)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        print('Form data:', form.data)

        new_address = Address(
            nickname=form.data['nickname'],
            address_line=form.data['address_line'],
            city=form.data['city'],
            state=form.data['state'],
            postal_code=form.data['postal']
        )
        db.session.add(new_address)
        db.session.commit()
        return jsonify(new_address.to_dict())

    print(form.errors)
    return jsonify(form.errors), 401

#UPDATE ADDRESS
@address_routes.route('/<int:address_id>', methods=['POST'])
@login_required
def update_address(address_id):
    address_to_edit = Address.query.get(address_id)
    pet = Pet.query.get(address_to_edit.pet_id)

    if pet.owner_id == current_user.id:
        body = request.get_json()
        form = AddressForm(data=body)
        form['csrf_token'].data = request.cookies['csrf_token']
        print('=======================================>',form.validate_on_submit())
        if form.validate_on_submit():
            print('=======================================>',form.data)
            address_to_edit.rating = form.rating.data
            address_to_edit.address = form.address.data

            db.session.commit()

            return address_to_edit.to_dict()

        return form.errors, 401
    return {'error': 'Unauthorized'}, 401

#DELETE ADDRESS

@address_routes.route("/<int:address_id>/delete", methods=['DELETE'])
@login_required
def delete_address(address_id):
    address_to_delete = Address.query.get(address_id)
    if not address_to_delete:
        return jsonify({"message": "address couldn't be found"}), 404
    db.session.delete(address_to_delete)
    db.session.commit()
