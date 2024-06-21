from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired

class BookingForm(FlaskForm):
    sitter_id = IntegerField('sitter_id', validators=[DataRequired()])
    pet_id = IntegerField('pet_id', validators=[DataRequired()])
    address_id = IntegerField('address_id', validators=[DataRequired()])
    at_home = BooleanField('at_home')
    overnight = BooleanField('overnight')
    start_date = StringField('start_date', validators=[DataRequired()])
    end_date = StringField('end_date', validators=[DataRequired()])
    requested_at = StringField('requested_at')
