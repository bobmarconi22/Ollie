from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.AWS_helpers import ALLOWED_EXTENSIONS

class PetForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    pet_pic = FileField("pet_pic", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    birthday = StringField('birthday', validators=[DataRequired()])
    breed = StringField('breed', validators=[DataRequired()])
    special_requests = StringField('special_requests')
