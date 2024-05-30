from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

sitter_routes = Blueprint('sitters', __name__)


@sitter_routes.route('/')
@login_required
def sitters():
    sitters = User.query.all()
    return {'sitters': [sitter.to_dict() for sitter in sitters]}
