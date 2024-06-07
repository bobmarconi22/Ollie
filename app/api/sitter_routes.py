from flask import Blueprint, jsonify, request
from sqlalchemy import or_
from sqlalchemy.sql import func 
from flask_login import login_required
from app.models import User, Review, db

sitter_routes = Blueprint('sitters', __name__)

def avgReviews(user):
    sum = 0
    for review in user.reviews:
        sum += review.rating
    return sum / len(review.rating)

#SITTERS SEARCH
@sitter_routes.route('/')
def search_sitters():
    search_filter = request.args.get('filter')
    search_rating = request.args.get('rating')
    sitters_query = User.query.filter(User.sitter == True)

    if search_filter:
        search_filter = f'%{search_filter}%'
        sitters_query = sitters_query.filter(
            db.or_(
                User.first_name.ilike(search_filter),
                User.last_name.ilike(search_filter),
                User.username.ilike(search_filter)
            )
        )

    if search_rating:
        try:
            search_rating = float(search_rating)
            sitters_query = sitters_query.outerjoin(Review, User.id == Review.sitter_id)\
                                         .group_by(User.id)\
                                         .having(func.avg(Review.rating) >= search_rating)
        except ValueError:
            pass

    sitters = sitters_query.all()
    return {'sitters': [sitter.to_dict() for sitter in sitters]}

#GET SITTER BY ID
@sitter_routes.route('/<int:sitter_id>')
def sitter_by_id(sitter_id):
    sitter = User.query.get(sitter_id)
    return sitter.to_dict()
