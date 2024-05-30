from app.models import db, Address, environment, SCHEMA
from sqlalchemy.sql import text


def seed_addresses():
    demo_addresses = [
        # Addresses for users
        Address(
            pet_id=None,
            user_id=1,
            address_line='123 Puppy Rd.',
            city='Philadelphia',
            state='Pennsylvania',
            postal_code=19380,
            public=False
        ),
        Address(
            pet_id=None,
            user_id=2,
            address_line='456 Sitter St.',
            city='New York',
            state='New York',
            postal_code=10001,
            public=True
        ),
        Address(
            pet_id=None,
            user_id=3,
            address_line='789 Doggo Ave.',
            city='San Francisco',
            state='California',
            postal_code=94102,
            public=True
        ),
        Address(
            pet_id=None,
            user_id=4,
            address_line='321 Cat Ln.',
            city='Seattle',
            state='Washington',
            postal_code=98101,
            public=True
        ),
        Address(
            pet_id=None,
            user_id=5,
            address_line='654 Pet St.',
            city='Austin',
            state='Texas',
            postal_code=73301,
            public=True
        ),
        Address(
            pet_id=None,
            user_id=6,
            address_line='987 Woof Blvd.',
            city='Denver',
            state='Colorado',
            postal_code=80203,
            public=True
        ),
        Address(
            pet_id=None,
            user_id=7,
            address_line='222 Barker Ln.',
            city='Boston',
            state='Massachusetts',
            postal_code=02118,
            public=True
        ),
        Address(
            pet_id=None,
            user_id=8,
            address_line='333 Meow Dr.',
            city='Chicago',
            state='Illinois',
            postal_code=60607,
            public=True
        ),
        Address(
            pet_id=None,
            user_id=9,
            address_line='444 Purr St.',
            city='Los Angeles',
            state='California',
            postal_code=90001,
            public=True
        ),
        Address(
            pet_id=None,
            user_id=10,
            address_line='555 Paw Ave.',
            city='Houston',
            state='Texas',
            postal_code=77001,
            public=True
        ),
        Address(
            pet_id=1,
            user_id=1,
            address_line='123 Puppy Rd.',
            city='Philadelphia',
            state='Pennsylvania',
            postal_code=19380,
            public=False
        ),
        Address(
            pet_id=2,
            user_id=4,
            address_line='321 Cat Ln.',
            city='Seattle',
            state='Washington',
            postal_code=98101,
            public=True
        ),
        Address(
            pet_id=3,
            user_id=5,
            address_line='654 Pet St.',
            city='Austin',
            state='Texas',
            postal_code=73301,
            public=True
        ),
        Address(
            pet_id=4,
            user_id=5,
            address_line='654 Pet St.',
            city='Austin',
            state='Texas',
            postal_code=73301,
            public=True
        ),
        Address(
            pet_id=5,
            user_id=6,
            address_line='987 Woof Blvd.',
            city='Denver',
            state='Colorado',
            postal_code=80203,
            public=True
        ),
        Address(
            pet_id=6,
            user_id=6,
            address_line='987 Woof Blvd.',
            city='Denver',
            state='Colorado',
            postal_code=80203,
            public=True
        ),
        Address(
            pet_id=7,
            user_id=7,
            address_line='222 Barker Ln.',
            city='Boston',
            state='Massachusetts',
            postal_code=02118,
            public=True
        ),
        Address(
            pet_id=8,
            user_id=7,
            address_line='222 Barker Ln.',
            city='Boston',
            state='Massachusetts',
            postal_code=02118,
            public=True
        ),
        Address(
            pet_id=9,
            user_id=8,
            address_line='333 Meow Dr.',
            city='Chicago',
            state='Illinois',
            postal_code=60607,
            public=True
        ),
        Address(
            pet_id=10,
            user_id=8,
            address_line='333 Meow Dr.',
            city='Chicago',
            state='Illinois',
            postal_code=60607,
            public=True
        )
    ]


    db.session.add_all(demo_addresses)
    db.session.commit()

def undo_addresses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.addresses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM addresses"))

    db.session.commit()
