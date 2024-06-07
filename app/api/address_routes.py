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
            user_id=current_user.id,
            nickname=form.data['nickname'],
            address_line=form.data['address_line'],
            city=form.data['city'],
            state=form.data['state'],
            postal_code=form.data['postal_code']
        )
        db.session.add(new_address)
        db.session.commit()
        return jsonify(new_address.to_dict())

    print(form.errors)
    return jsonify(form.errors), 400

#UPDATE ADDRESS
@address_routes.route('/<int:address_id>', methods=['POST'])
@login_required
def update_address(address_id):
    address_to_edit = Address.query.get(address_id)

    if address_to_edit.user_id == current_user.id:
        body = request.get_json()
        form = AddressForm(data=body)
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            address_to_edit.nickname = form.nickname.data
            address_to_edit.address_line = form.address_line.data
            address_to_edit.city = form.city.data
            address_to_edit.state = form.state.data
            address_to_edit.postal_code = form.postal_code.data

            db.session.commit()

            return address_to_edit.to_dict()

        return form.errors, 400
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
