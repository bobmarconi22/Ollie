from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.AWS_helpers import ALLOWED_EXTENSIONS

class EditUserForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    profile_pic = FileField("profile_pic", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    email = StringField('email', validators=[DataRequired()])
    phone = StringField('phone')
