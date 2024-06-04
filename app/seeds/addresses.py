from app.models import db, Address, Pet, environment, SCHEMA
from sqlalchemy.sql import text


def seed_addresses():
    demo_addresses = [
    Address(
        user_id=1,
        nickname='home',
        address_line='123 Puppy Rd.',
        city='Philadelphia',
        state='Pennsylvania',
        postal_code='19380'
    ),
    Address(
        user_id=2,
        nickname='home',
        address_line='456 Sitter St.',
        city='New York',
        state='New York',
        postal_code='10001'
    ),
    Address(
        user_id=3,
        nickname='home',
        address_line='789 Doggo Ave.',
        city='San Francisco',
        state='California',
        postal_code='94102'
    ),
    Address(
        user_id=4,
        nickname='home',
        address_line='321 Cat Ln.',
        city='Seattle',
        state='Washington',
        postal_code='98101'
    ),
    Address(
        user_id=5,
        nickname='home',
        address_line='654 Pet St.',
        city='Austin',
        state='Texas',
        postal_code='73301'
    ),
    Address(
        user_id=6,
        nickname='home',
        address_line='987 Woof Blvd.',
        city='Denver',
        state='Colorado',
        postal_code='80203'
    ),
    Address(
        user_id=7,
        nickname='home',
        address_line='222 Barker Ln.',
        city='Boston',
        state='Massachusetts',
        postal_code='02118'
    ),
    Address(
        user_id=8,
        nickname='home',
        address_line='333 Meow Dr.',
        city='Chicago',
        state='Illinois',
        postal_code='60607'
    ),
    Address(
        user_id=9,
        nickname='home',
        address_line='444 Purr St.',
        city='Los Angeles',
        state='California',
        postal_code='90001'
    ),
    Address(
        user_id=10,
        nickname='home',
        address_line='555 Paw Ave.',
        city='Houston',
        state='Texas',
        postal_code='77001'
    ),
        Address(
        user_id=11,
        nickname='home',
        address_line='666 Pet Haven',
        city='Miami',
        state='Florida',
        postal_code='33101'
    ),
    Address(
        user_id=12,
        nickname='home',
        address_line='777 Fur Lane',
        city='Dallas',
        state='Texas',
        postal_code='75201'
    ),
    Address(
        user_id=13,
        nickname='home',
        address_line='888 Animal St.',
        city='Atlanta',
        state='Georgia',
        postal_code='30301'
    ),
    Address(
        user_id=14,
        nickname='home',
        address_line='999 Creature Rd.',
        city='Phoenix',
        state='Arizona',
        postal_code='85001'
    ),
    Address(
        user_id=15,
        nickname='home',
        address_line='111 Pet Park',
        city='Las Vegas',
        state='Nevada',
        postal_code='89101'
    ),
    Address(
        user_id=16,
        nickname='home',
        address_line='222 Critter Blvd.',
        city='Orlando',
        state='Florida',
        postal_code='32801'
    ),
    Address(
        user_id=17,
        nickname='home',
        address_line='333 Woofington Dr.',
        city='Portland',
        state='Oregon',
        postal_code='97201'
    ),
    Address(
        user_id=18,
        nickname='home',
        address_line='444 Paws Place',
        city='Salt Lake City',
        state='Utah',
        postal_code='84101'
    ),
    Address(
        user_id=19,
        nickname='home',
        address_line='555 Bark Blvd.',
        city='Kansas City',
        state='Missouri',
        postal_code='64101'
    ),
    Address(
        user_id=20,
        nickname='home',
        address_line='666 Furry Ln.',
        city='Minneapolis',
        state='Minnesota',
        postal_code='55401'
    ),
    Address(
        user_id=21,
        nickname='home',
        address_line='777 Pet Paws Rd.',
        city='Charlotte',
        state='North Carolina',
        postal_code='28201'
    )
    ]

    db.session.add_all(demo_addresses)
    db.session.commit()

    pets = Pet.query.all()
    for pet in pets:
        owner_address = Address.query.filter_by(user_id=pet.owner_id).first()
        if owner_address:
            pet.home_address_id = owner_address.id
    db.session.commit()

def undo_addresses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.addresses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM addresses"))

    db.session.commit()
