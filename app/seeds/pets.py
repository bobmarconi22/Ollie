from app.models import db, Pet, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_pets():
    demo_pets = [
        Pet(
            owner_id=1,
            name='Louie',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2020, 5, 14),
            breed='Beagle',
            special_requests=None
        ),
        Pet(
            owner_id=2,
            name='Bella',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2018, 7, 23),
            breed='Bulldog',
            special_requests='Needs daily exercise'
        ),
        Pet(
            owner_id=2,
            name='Max',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2019, 3, 22),
            breed='Labrador',
            special_requests='Special diet'
        ),
        Pet(
            owner_id=3,
            name='Lucy',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2021, 1, 10),
            breed='Poodle',
            special_requests='Grooming required'
        ),
        Pet(
            owner_id=3,
            name='Charlie',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2020, 6, 15),
            breed='Golden Retriever',
            special_requests=None
        ),
        Pet(
            owner_id=4,
            name='Daisy',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2019, 11, 2),
            breed='German Shepherd',
            special_requests='Loves long walks'
        ),
        Pet(
            owner_id=4,
            name='Molly',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2020, 2, 20),
            breed='Shih Tzu',
            special_requests=None
        ),
        Pet(
            owner_id=4,
            name='Buddy',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2019, 9, 15),
            breed='Cocker Spaniel',
            special_requests='Requires medication'
        ),
        Pet(
            owner_id=5,
            name='Rocky',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2021, 4, 18),
            breed='Boxer',
            special_requests=None
        ),
        Pet(
            owner_id=5,
            name='Sadie',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2020, 12, 12),
            breed='Pomeranian',
            special_requests='Prefers indoor play'
        )
    ]

    db.session.add_all(demo_pets)
    db.session.commit()

def undo_pets():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pets RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pets"))

    db.session.commit()
