from flask import Blueprint, request, jsonify
from app.models import Review, Pet, db
from app.forms import ReviewForm
from datetime import datetime
from flask_login import current_user, login_user, logout_user, login_required

review_routes = Blueprint('reviews', __name__)

#GET ALL REVIEWS BY PET_ID
@review_routes.route('/pet/<int:pet_id>')
def reviews(pet_id):
    reviews = Review.query.filter(Review.pet_id == pet_id).all()
    return {'pet_reviews': [review.to_dict() for review in reviews]}

#CREATE REVIEW
@review_routes.route('/create', methods=['POST'])
@login_required
def create_review():
    body = request.get_json()

    form = ReviewForm(data=body)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        new_review = Review(
            rating=form.data['rating'],
            review=form.data['review'],
            pet_id=form.data['pet_id'],
            sitter_id=form.data['sitter_id']
        )
        db.session.add(new_review)
        db.session.commit()
        return jsonify(new_review.to_dict())
    return jsonify(form.errors), 400

#UPDATE REVIEW
@review_routes.route('/<int:review_id>', methods=['POST'])
@login_required
def update_review(review_id):
    review_to_edit = Review.query.get(review_id)
    pet = Pet.query.get(review_to_edit.pet_id)

    if pet.owner_id == current_user.id:
        body = request.get_json()
        form = ReviewForm(data=body)
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            review_to_edit.rating = form.rating.data
            review_to_edit.review = form.review.data

            db.session.commit()

            return review_to_edit.to_dict()

        return form.errors, 400
    return {'error': 'Unauthorized'}, 401

#DELETE REVIEW
@review_routes.route("/<int:review_id>/delete", methods=['DELETE'])
@login_required
def delete_review(review_id):
    review_to_delete = Review.query.get(review_id)
    if not review_to_delete:
        return jsonify({"message": "review couldn't be found"}), 404
    db.session.delete(review_to_delete)
    db.session.commit()
    return jsonify({"message": "Successfully deleted"}), 200
