from .db import db, environment, SCHEMA, add_prefix_for_prod

class Address(db.Model):
    __tablename__ = 'addresses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    pet_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('pets.id'), ondelete='SET NULL'), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    address_line = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    postal_code = db.Column(db.String(50), nullable=False)
    public = db.Column(db.Boolean)

    pet = db.relationship('Pet', back_populates='home_address', uselist=False)
    user = db.relationship('User', back_populates='address', uselist=False)
