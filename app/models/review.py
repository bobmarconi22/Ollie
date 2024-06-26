from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    pet_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('pets.id'), ondelete='CASCADE'), nullable=False)
    sitter_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    review = db.Column(db.String(255), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    pet = db.relationship('Pet', back_populates='reviews')
    sitter = db.relationship('User', back_populates='reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'pet_id': self.pet_id,
            'sitter_id': self.sitter_id,
            'review': self.review,
            'rating': self.rating,
            'pet': self.pet.to_dict(),
            'created_at': self.created_at,
            'updated_at': self.updated_at,

        }
