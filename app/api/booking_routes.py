from flask import Blueprint, request, jsonify
from app.models import Booking, BookingRequest, Address, db
from app.forms import BookingForm
from datetime import datetime
from flask_login import login_required

booking_routes = Blueprint('booking', __name__)


#REQUEST SPECIFIC ROUTES

#CREATE REQUEST
@booking_routes.route('/request/create', methods=['POST'])
@login_required
def create_request():
    body = request.form

    form = BookingForm(data=body)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        start = datetime.strptime(form.data['start_date'], '%Y-%m-%d')
        end = datetime.strptime(form.data['end_date'], '%Y-%m-%d')
        address_check = db.session.query(Address).filter(Address.user_id == form.data['sitter_id']).all()
        new_request = BookingRequest(
            sitter_id=form.data['sitter_id'],
            pet_id=form.data['pet_id'],
            address_id =form.data['address_id'],
            at_home=len(address_check) != 0,
            overnight=start != end,
            start_date=start,
            end_date=end,
            requested_at=datetime.now()
        )
        db.session.add(new_request)
        db.session.commit()
        return jsonify(new_request.to_dict())

    print(form.errors)
    return jsonify(form.errors), 400

#DELETE REQUEST
@booking_routes.route("/request/<int:request_id>/delete", methods=['DELETE'])
@login_required
def delete_request(request_id):
    request_to_delete = BookingRequest.query.get(request_id)
    if not request_to_delete:
        return jsonify({"message": "request couldn't be found"}), 404
    db.session.delete(request_to_delete)
    db.session.commit()
    return jsonify({"message": "Successfully deleted"}), 200




# BOOKING SPECIFIC ROUTES

#CREATE BOOKING
@booking_routes.route('/create', methods=['POST'])
@login_required
def create_booking():
    body = request.form

    form = BookingForm(data=body)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        start = datetime.strptime(form.data['start_date'], '%a, %d %b %Y %H:%M:%S %Z')
        end = datetime.strptime(form.data['end_date'], '%a, %d %b %Y %H:%M:%S %Z')
        address_check = db.session.query(Address).filter(Address.user_id == form.data['sitter_id']).all()
        new_booking = Booking(
            sitter_id=form.data['sitter_id'],
            pet_id=form.data['pet_id'],
            address_id=form.data['address_id'],
            at_home=len(address_check) != 0,
            overnight=start != end,
            start_date=start,
            end_date=end
        )
        db.session.add(new_booking)
        db.session.commit()
        return jsonify(new_booking.to_dict())

    print(form.errors)
    return jsonify(form.errors), 400

# #UPDATE ADDRESS
# @booking_routes.route('/<int:address_id>', methods=['POST'])
# @login_required
# def update_address(address_id):
#     address_to_edit = Address.query.get(address_id)

#     if address_to_edit.user_id == current_user.id:
#         body = request.get_json()
#         form = AddressForm(data=body)
#         form['csrf_token'].data = request.cookies['csrf_token']
#         if form.validate_on_submit():
#             address_to_edit.nickname = form.nickname.data
#             address_to_edit.address_line = form.address_line.data
#             address_to_edit.city = form.city.data
#             address_to_edit.state = form.state.data
#             address_to_edit.postal_code = form.postal_code.data

#             db.session.commit()

#             return address_to_edit.to_dict()

#         return form.errors, 400
#     return {'error': 'Unauthorized'}, 401
