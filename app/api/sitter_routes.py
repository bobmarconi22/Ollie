from flask import Blueprint, jsonify, request
from sqlalchemy import or_
from flask_login import login_required
from app.models import User, db  # Ensure db is imported from your app

sitter_routes = Blueprint('sitters', __name__)

@sitter_routes.route('/all')
def sitters():
    search_filter = request.args.get('filter')
    rating_filter = request.args.get('rating')

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

    sitters = sitters_query.all()
    return jsonify({'sitters': [sitter.to_dict() for sitter in sitters]})


@sitter_routes.route('/<int:sitter_id>')
def sitter_by_id(sitter_id):
    sitter = User.query.get(sitter_id)
    return sitter.to_dict()
