from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Optional
from flask_wtf.file import FileField, FileAllowed
from app.api.AWS_helpers import ALLOWED_EXTENSIONS

class PetForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    pet_pic = FileField("pet_pic", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    birthday = StringField('birthday', validators=[DataRequired()])
    breed = StringField('breed', validators=[DataRequired()])
    special_requests = StringField('special_requests')
    home_address_id = IntegerField('home_address_id')
