from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
from flask_wtf.file import FileField, FileAllowed
from flask_login import current_user
from app.api.AWS_helpers import ALLOWED_EXTENSIONS


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username, User.id != current_user.id).first()
    if user:
        raise ValidationError('Username unavailable.')


class EditUserForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists])
    profile_pic = FileField("profile_pic", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    email = StringField('email', validators=[DataRequired()])
    phone = StringField('phone')
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    sitter = BooleanField('sitter')
    overnight = BooleanField('overnight')
    at_home = BooleanField('at_home')
