from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Pet(db.Model):
    __tablename__ = 'pets'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    name = db.Column(db.String(20), nullable=False, unique=True)
    pet_pic = db.Column(db.String(100), nullable=False, default='https://marconi22-ollie.s3.us-east-2.amazonaws.com/9973d54b660b4fe48b74e79ac2a4c333.png')
    birthday = db.Column(db.DateTime, nullable=False)
    breed = db.Column(db.String(255), nullable=False)
    special_requests = db.Column(db.String(255), nullable=True)

    home_address_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('addresses.id')), nullable=True)
    home_address = db.relationship('Address', back_populates='pets', foreign_keys=[home_address_id])
    owner = db.relationship('User', back_populates='pets', foreign_keys=[owner_id])
    reviews = db.relationship('Review', back_populates='pet', cascade='all, delete-orphan')
    bookings = db.relationship('Booking', back_populates='pet', cascade='all, delete-orphan')
    booking_requests = db.relationship('BookingRequest', back_populates='pet', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'pet_pic': self.pet_pic,
            'birthday': self.birthday,
            'breed': self.breed,
            'special_requests': self.special_requests,
            'address': self.home_address,
        }
