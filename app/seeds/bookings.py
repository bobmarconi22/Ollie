from app.models import db, Booking, BookingRequest, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta

def seed_bookings():
    now = datetime.now()

    demo_bookings = [
        Booking(
            sitter_id=8,  # Demo Sitter
            pet_id=3,
            address_id=1,
            start_date=now + timedelta(days=1),
            end_date=now + timedelta(days=3),
            at_home=True,
            overnight=True,
        ),
        Booking(
            sitter_id=6,  # John Doe
            pet_id=2,
            address_id=1,
            start_date=now + timedelta(days=5),
            end_date=now + timedelta(days=5),
            at_home=True,
            overnight=False,
        ),
        Booking(
            sitter_id=7,  # Jane Smith
            pet_id=3,
            address_id=7,
            start_date=now + timedelta(days=6),
            end_date=now + timedelta(days=7),
            at_home=False,
            overnight=True,
        ),
        Booking(
            sitter_id=11,  # Bob Williams
            pet_id=4,
            address_id=3,
            start_date=now + timedelta(days=2),
            end_date=now + timedelta(days=2),
            at_home=True,
            overnight=False,
        ),
        Booking(
            sitter_id=11,  # Bob Williams
            pet_id=5,
            address_id=3,
            start_date=now + timedelta(days=4),
            end_date=now + timedelta(days=4),
            at_home=True,
            overnight=False,
        ),
        Booking(
            sitter_id=12,  # Maya Lee
            pet_id=6,
            address_id=12,
            start_date=now + timedelta(days=3),
            end_date=now + timedelta(days=3),
            at_home=False,
            overnight=False,
        ),
        Booking(
            sitter_id=14,  # Emma Miller
            pet_id=7,
            address_id=14,
            start_date=now + timedelta(days=5),
            end_date=now + timedelta(days=6),
            at_home=False,
            overnight=True,
        ),
        Booking(
            sitter_id=15,  # Frank Moore
            pet_id=8,
            address_id=4,
            start_date=now + timedelta(days=8),
            end_date=now + timedelta(days=8),
            at_home=True,
            overnight=False,
        ),
        Booking(
            sitter_id=16,  # Grace Taylor
            pet_id=9,
            address_id=5,
            start_date=now + timedelta(days=1),
            end_date=now + timedelta(days=1),
            at_home=True,
            overnight=False,
        ),
        Booking(
            sitter_id=18,  # Irene Thomas
            pet_id=10,
            address_id=18,
            start_date=now + timedelta(days=4),
            end_date=now + timedelta(days=4),
            at_home=False,
            overnight=False,
        )
    ]
    demo_requests = [
        BookingRequest(
            sitter_id=8,  # Demo Sitter
            pet_id=10,
            address_id=8,
            start_date=now + timedelta(days=4),
            end_date=now + timedelta(days=6),
            at_home=False,
            overnight=True,
        )
    ]

    db.session.add_all(demo_bookings)
    db.session.add_all(demo_requests)
    db.session.commit()

def undo_bookings():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bookings"))

    db.session.commit()
