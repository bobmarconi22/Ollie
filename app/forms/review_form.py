from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import User

class ReviewForm(FlaskForm):
    rating = IntegerField('rating', validators=[DataRequired()])
    review = StringField('review', validators=[DataRequired()])
    pet_id = IntegerField('pet_id', validators=[DataRequired()])
    sitter_id = IntegerField('sitter_id', validators=[DataRequired()])
