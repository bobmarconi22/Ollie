from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Booking(db.Model):
    __tablename__ = 'bookings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    sitter_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    pet_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('pets.id'), ondelete='CASCADE'), nullable=False)
    address_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('addresses.id')), nullable=False)
    at_home = db.Column(db.Boolean)
    overnight = db.Column(db.Boolean)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)

    sitter = db.relationship('User', back_populates='bookings', uselist=False)
    pet = db.relationship('Pet', back_populates='bookings', uselist=False)
    address = db.relationship('Address', back_populates='bookings')

    def to_dict(self):
        return {
            'id': self.id,
            'pet_id': self.pet_id,
            'sitter_id': self.sitter_id,
            'address_id': self.address_id,
            'at_home': self.at_home,
            'overnight': self.overnight,
            'pet': self.pet.to_dict(),
            'address': self.address.to_dict(),
            'start_date': self.start_date,
            'end_date': self.end_date
        }

class BookingRequest(db.Model):
    __tablename__ = 'booking_requests'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    sitter_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    pet_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('pets.id'), ondelete='CASCADE'), nullable=False)
    address_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('addresses.id')), nullable=False)
    at_home = db.Column(db.Boolean)
    overnight = db.Column(db.Boolean)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    requested_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    sitter = db.relationship('User', back_populates='booking_requests')
    pet = db.relationship('Pet', back_populates='booking_requests')
    address = db.relationship('Address', back_populates='booking_requests')

    def to_dict(self):
        return {
            'id': self.id,
            'pet_id': self.pet_id,
            'sitter_id': self.sitter_id,
            'address_id': self.address_id,
            'at_home': self.at_home,
            'overnight': self.overnight,
            'pet': self.pet.to_dict(),
            'address': self.address.to_dict(),
            'start_date': self.start_date,
            'end_date': self.end_date
        }
