from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(10), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    profile_pic = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    phone = db.Column(db.String(15), nullable=True, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    sitter = db.Column(db.Boolean)
    overnight = db.Column(db.Boolean)
    at_home = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    pets = db.relationship('Pet', back_populates='owner', cascade='all, delete-orphan')
    address = db.relationship('Address', back_populates='user', uselist=False, cascade='all, delete-orphan')
    reviews = db.relationship('Review', back_populates='sitter', cascade='all, delete-orphan')
    bookings = db.relationship('Booking', back_populates='sitter', cascade='all, delete-orphan')
    booking_requests = db.relationship('BookingRequest', back_populates='sitter', cascade='all, delete-orphan')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'profile_pic': self.profile_pic,
            'username': self.username,
            'email': self.email
        }
