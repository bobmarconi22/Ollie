from .db import db, environment, SCHEMA, add_prefix_for_prod

class Address(db.Model):
    __tablename__ = 'addresses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    address_line = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    postal_code = db.Column(db.String(50), nullable=False)
    public = db.Column(db.Boolean)

    user = db.relationship('User', back_populates='addresses')
    pets = db.relationship('Pet', back_populates='home_address', foreign_keys='Pet.home_address_id')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'address_line': self.address_line,
            'city': self.city,
            'state': self.state,
            'postal_code': self.postal_code,
            'public': self.public
        }
