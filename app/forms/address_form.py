from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired
from app.models import User

class AddressForm(FlaskForm):
    nickname = StringField('nickname')
    address_line = StringField('address_line', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    postal_code = StringField('postal_code', validators=[DataRequired()])
    sitting_address = BooleanField('sitting_address')
