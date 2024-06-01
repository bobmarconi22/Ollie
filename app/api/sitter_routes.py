from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

sitter_routes = Blueprint('sitters', __name__)


@sitter_routes.route('/all')
def sitters():
    sitters = User.query.filter(User.sitter==True).all()
    return {'sitters': [sitter.to_dict() for sitter in sitters]}

@sitter_routes.route('/<int:sitter_id>')
def sitter_by_id(sitter_id):
    sitter = User.query.get(sitter_id)
    return sitter.to_dict()
