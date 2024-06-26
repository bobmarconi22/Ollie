from flask import Blueprint, request, jsonify
from app.models import User, Address, db
from app.forms import LoginForm
from app.forms import SignUpForm
from app.forms import EditUserForm
from flask_login import current_user, login_user, logout_user, login_required
from .AWS_helpers import upload_file_to_s3, remove_file_from_s3, get_unique_filename

auth_routes = Blueprint('auth', __name__)


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': {'message': 'Unauthorized'}}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return form.errors, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if form.data['profile_pic']:
            image = form.data['profile_pic']
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            image_url = upload['url']
        else:
            image_url = 'https://marconi22-ollie.s3.us-east-2.amazonaws.com/4dead4e64d8e410bb7e0b8050a34f38c.png'

        user = User(
            username=form.data['username'],
            profile_pic=image_url,
            email=form.data['email'],
            phone=form.data['phone'],
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            sitter=form.data['sitter'],
            overnight=form.data['overnight'],
            at_home=form.data['at_home'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    print(form.errors)
    return form.errors, 401


#UPDATE USER
@auth_routes.route('/<int:user_id>', methods=['POST'])
@login_required
def update_user(user_id):
    user_to_edit = User.query.get(user_id)

    if user_to_edit.id == current_user.id:
        form = EditUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if form.data['profile_pic']:
            image = form.data['profile_pic']
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            image_url = upload['url']
        else:
            image_url = user_to_edit.profile_pic

        user_to_edit.username=form.data['username']
        user_to_edit.profile_pic=image_url
        user_to_edit.email=form.data['email']
        user_to_edit.phone=form.data['phone']
        user_to_edit.first_name=form.data['first_name']
        user_to_edit.sitter=form.data['sitter']
        user_to_edit.last_name=form.data['last_name']
        user_to_edit.overnight=form.data['overnight']
        user_to_edit.at_home=form.data['at_home']
        sitting_address_id = form.data['sitting_address_id']
        if sitting_address_id != user_to_edit.sitting_address.id:

            current_sitting_address = Address.query.filter(
                Address.user_id == user_to_edit.id,
                Address.sitting_address == True
            ).first()

            current_sitting_address.sitting_address = False

            new_sitting_address = Address.query.get(sitting_address_id)
            new_sitting_address.sitting_address = True

        db.session.commit()
        db.session.commit()

        return user_to_edit.to_dict()
    return {'errors': form.errors}, 401

#DELETES A USER
@auth_routes.route('/delete/<int:user_id>', methods=['DELETE'])
def del_user(user_id):
    user_to_delete = User.query.get(user_id)
    if user_to_delete.profile_pic != 'https://marconi22-ollie.s3.us-east-2.amazonaws.com/4dead4e64d8e410bb7e0b8050a34f38c.png':
        file_to_delete = remove_file_from_s3(user_to_delete.profile_pic)
        print(file_to_delete)
    if not user_to_delete:
        response = jsonify({"message": "Shop user couldn't be found"})
        response.status_code = 404
        return response
    db.session.delete(user_to_delete)
    db.session.commit()
    return jsonify({"message": "Successfully deleted"}), 200


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': {'message': 'Unauthorized'}}, 401
