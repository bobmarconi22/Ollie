from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Pet(db.Model):
    __tablename__ = 'pets'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    name = db.Column(db.String(20), nullable=False, unique=True)
    pet_pic = db.Column(db.String(100), nullable=False)
    birthday = db.Column(db.DateTime, nullable=False)
    breed = db.Column(db.String(255), nullable=False)
    special_requests = db.Column(db.String(255), nullable=True)

    home_address = db.relationship('Address', back_populates='pet', uselist=False)
    owner = db.relationship('User', back_populates='pets', uselist=False)
    reviews = db.relationship('Review', back_populates='pet', cascade='all, delete-orphan')
    bookings = db.relationship('Booking', back_populates='pet', cascade='all, delete-orphan')
    booking_requests = db.relationship('BookingRequest', back_populates='pet', cascade='all, delete-orphan')
