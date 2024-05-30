from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


def seed_reviews():
    demo_reviews = [
        Review(
            pet_id=1,
            sitter_id=1,  # John Doe
            review='Great experience!',
            rating=5
        ),
        Review(
            pet_id=2,
            sitter_id=2,  # Jane Smith
            review='Very attentive sitter!',
            rating=4
        ),
        Review(
            pet_id=3,
            sitter_id=2,  # Jane Smith
            review='Max loved his stay!',
            rating=5
        ),
        Review(
            pet_id=4,
            sitter_id=3,  # Alice Johnson
            review='Lucy was well taken care of.',
            rating=4
        ),
        Review(
            pet_id=5,
            sitter_id=1,  # John Doe
            review='Charlie had a great time!',
            rating=5
        ),
        Review(
            pet_id=6,
            sitter_id=2,  # Jane Smith
            review='Daisy enjoyed the walks!',
            rating=5
        ),
        Review(
            pet_id=7,
            sitter_id=3,  # Alice Johnson
            review='Molly was happy and healthy.',
            rating=4
        ),
        Review(
            pet_id=8,
            sitter_id=1,  # John Doe
            review='Buddy needed medication and they handled it perfectly.',
            rating=5
        ),
        Review(
            pet_id=9,
            sitter_id=2,  # Jane Smith
            review='Rocky had a lot of fun!',
            rating=5
        ),
        Review(
            pet_id=10,
            sitter_id=3,  # Alice Johnson
            review='Sadie was very comfortable.',
            rating=4
        )
    ]

    db.session.add_all(demo_reviews)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
