from app.models import db, Booking, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta

def seed_bookings():
    now = datetime.now()

    demo_bookings = [
        Booking(
            sitter_id=7,  # Demo Sitter
            pet_id=1,
            start_date=now + timedelta(days=1),
            end_date=now + timedelta(days=3),
            at_home=True,
            overnight=False,
        ),
        Booking(
            sitter_id=8,  # John Doe
            pet_id=2,
            start_date=now + timedelta(days=4),
            end_date=now + timedelta(days=5),
            at_home=True,
            overnight=False,
        ),
        Booking(
            sitter_id=9,  # Jane Smith
            pet_id=3,
            start_date=now + timedelta(days=6),
            end_date=now + timedelta(days=7),
            at_home=False,
            overnight=True,
        ),
        Booking(
            sitter_id=11,  # Bob Williams
            pet_id=4,
            start_date=now + timedelta(days=1),
            end_date=now + timedelta(days=2),
            at_home=True,
            overnight=False,
        ),
        Booking(
            sitter_id=12,  # Carol Brown
            pet_id=5,
            start_date=now + timedelta(days=3),
            end_date=now + timedelta(days=4),
            at_home=True,
            overnight=False,
        ),
        Booking(
            sitter_id=13,  # Maya Lee
            pet_id=6,
            start_date=now + timedelta(days=2),
            end_date=now + timedelta(days=3),
            at_home=True,
            overnight=False,
        ),
        Booking(
            sitter_id=16,  # Emma Miller
            pet_id=7,
            start_date=now + timedelta(days=5),
            end_date=now + timedelta(days=6),
            at_home=False,
            overnight=True,
        ),
        Booking(
            sitter_id=17,  # Frank Moore
            pet_id=8,
            start_date=now + timedelta(days=7),
            end_date=now + timedelta(days=8),
            at_home=True,
            overnight=False,
        ),
        Booking(
            sitter_id=18,  # Grace Taylor
            pet_id=9,
            start_date=now + timedelta(days=1),
            end_date=now + timedelta(days=2),
            at_home=True,
            overnight=False,
        ),
        Booking(
            sitter_id=19,  # Irene Thomas
            pet_id=10,
            start_date=now + timedelta(days=3),
            end_date=now + timedelta(days=4),
            at_home=True,
            overnight=False,
        )
    ]

    db.session.add_all(demo_bookings)
    db.session.commit()

def undo_bookings():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bookings"))

    db.session.commit()
