from app.models import db, Pet, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_pets():
    demo_pets = [
        Pet(
            owner_id=8,
            name='Louie',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2014, 10, 7),
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
        ),
                Pet(
            owner_id=6,
            name='Oscar',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2018, 10, 30),
            breed='Corgi',
            special_requests='Likes to dig'
        ),
        Pet(
            owner_id=7,
            name='Simba',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2019, 8, 22),
            breed='Maine Coon',
            special_requests='Needs scratching post'
        ),
        Pet(
            owner_id=1,
            name='Milo',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2021, 2, 5),
            breed='Bengal',
            special_requests='Prefers high places'
        ),
        Pet(
            owner_id=9,
            name='Zoe',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2017, 5, 17),
            breed='Ragdoll',
            special_requests='Requires daily brushing'
        ),
        Pet(
            owner_id=10,
            name='Lily',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2020, 7, 25),
            breed='Sphynx',
            special_requests='Needs sunscreen'
        ),
        Pet(
            owner_id=11,
            name='Cooper',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2019, 1, 29),
            breed='Siamese',
            special_requests=None
        ),
        Pet(
            owner_id=12,
            name='Nala',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2020, 4, 10),
            breed='Persian',
            special_requests='Requires eye cleaning'
        ),
        Pet(
            owner_id=13,
            name='Buddy',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2021, 3, 3),
            breed='Bichon Frise',
            special_requests='Hypoallergenic diet'
        ),
        Pet(
            owner_id=14,
            name='Rex',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2020, 6, 18),
            breed='Doberman',
            special_requests='Requires training'
        ),
        Pet(
            owner_id=15,
            name='Ginger',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2019, 7, 30),
            breed='Chihuahua',
            special_requests='Prefers warm places'
        ),
        Pet(
            owner_id=16,
            name='Sasha',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2018, 2, 22),
            breed='Husky',
            special_requests='Loves to run'
        ),
        Pet(
            owner_id=17,
            name='Jake',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2020, 11, 11),
            breed='Border Collie',
            special_requests='Needs agility training'
        ),
        Pet(
            owner_id=18,
            name='Peanut',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2021, 9, 9),
            breed='Shiba Inu',
            special_requests='Enjoys puzzles'
        ),
        Pet(
            owner_id=19,
            name='Teddy',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2019, 12, 19),
            breed='Maltese',
            special_requests='Requires special shampoo'
        ),
        Pet(
            owner_id=18,
            name='Hazel',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2020, 10, 10),
            breed='Pug',
            special_requests='Prefers soft toys'
        ),
        Pet(
            owner_id=19,
            name='Leo',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2019, 3, 15),
            breed='Schnauzer',
            special_requests=None
        ),
        Pet(
            owner_id=19,
            name='Ruby',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2021, 8, 8),
            breed='Akita',
            special_requests='Enjoys fetch'
        ),
        Pet(
            owner_id=20,
            name='Minnie',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2020, 12, 12),
            breed='Dalmatian',
            special_requests='Sensitive to cold'
        ),
        Pet(
            owner_id=20,
            name='Duke',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2018, 4, 18),
            breed='Great Dane',
            special_requests='Needs large space'
        ),
        Pet(
            owner_id=21,
            name='Scout',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2021, 1, 1),
            breed='Australian Shepherd',
            special_requests='Requires mental stimulation'
        ),
        Pet(
            owner_id=21,
            name='Archie',
            pet_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png',
            birthday=datetime(2021, 7, 7),
            breed='Saint Bernard',
            special_requests='Prefers cool climates'
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
