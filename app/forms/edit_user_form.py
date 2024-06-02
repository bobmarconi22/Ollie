from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
from flask_wtf.file import FileField, FileAllowed
from app.api.AWS_helpers import ALLOWED_EXTENSIONS

class EditUserForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    profile_pic = FileField("profile_pic", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    email = StringField('email', validators=[DataRequired()])
    phone = StringField('phone')
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    overnight = BooleanField('overnight')
    at_home = BooleanField('at_home')
