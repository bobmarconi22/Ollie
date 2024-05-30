from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from werkzeug.security import generate_password_hash


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo_users = [
        # NON SITTERS
        User(
            username='demo_user', email='demo@aa.io', first_name='Demo', last_name='User', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/8512b4f33e95447db806cb48a74957b0.jpg', phone='555-555-5500', sitter=False, at_home=None,overnight=None, password='password'),
        User(
            username='nate_hall', email='nate.hall@aa.io', first_name='Nate', last_name='Hall', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/8512b4f33e95447db806cb48a74957b0.jpg', phone='555-555-5517', sitter=False, at_home=None, overnight=None, password='password'),
        User(
            username='olivia_harris', email='olivia.harris@aa.io', first_name='Olivia', last_name='Harris', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/8512b4f33e95447db806cb48a74957b0.jpg', phone='555-555-5518', sitter=False, at_home=None, overnight=None, password='password'),
        User(
            username='quinn_walker', email='quinn.walker@aa.io', first_name='Quinn', last_name='Walker', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/8512b4f33e95447db806cb48a74957b0.jpg', phone='555-555-5519', sitter=False, at_home=None, overnight=None, password='password'),
        User(
            username='rachel_scott', email='rachel.scott@aa.io', first_name='Rachel', last_name='Scott', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/8512b4f33e95447db806cb48a74957b0.jpg', phone='555-555-5520', sitter=False, at_home=None, overnight=None, password='password'),

        # SITTERS
        User(
            username='demo_sitter', email='demo.sitter@aa.io', first_name='Demo', last_name='Sitter', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/8512b4f33e95447db806cb48a74957b0.jpg', phone='555-555-5501', sitter=True, sitter_id=1, at_home=True, overnight=True, password='password'),
        User(
            username='john_doe', email='john.doe@aa.io', first_name='John', last_name='Doe', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/8512b4f33e95447db806cb48a74957b0.jpg', phone='555-555-5502', sitter=True, sitter_id=2, at_home=True, overnight=False, password='password'),
        User(
            username='jane_smith', email='jane.smith@aa.io', first_name='Jane', last_name='Smith', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/8512b4f33e95447db806cb48a74957b0.jpg', phone='555-555-5503', sitter=True, sitter_id=3, at_home=False,overnight=True, password='password'),
        User(
            username='alice_johnson', email='alice.johnson@aa.io', first_name='Alice', last_name='Johnson', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/8512b4f33e95447db806cb48a74957b0.jpg', phone='555-555-5504', sitter=True, sitter_id=4, at_home=False, overnight=False, password='password'),
        User(
            username='bob_williams', email='bob.williams@aa.io', first_name='Bob', last_name='Williams', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/8512b4f33e95447db806cb48a74957b0.jpg', phone='555-555-5505', sitter=True, sitter_id=5, at_home=True, overnight=True, password='password'),
        User(
            username='carol_brown', email='carol.brown@aa.io', first_name='Carol', last_name='Brown', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/8512b4f33e95447db806cb48a74957b0.jpg', phone='555-555-5506', sitter=True, sitter_id=6, at_home=True, overnight=False, password='password'),
        User(
            username='maya_lee', email='maya.lee@aa.io', first_name='Maya', last_name='Lee', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/8512b4f33e95447db806cb48a74957b0.jpg', phone='555-555-5507', sitter=True, sitter_id=7, at_home=True, overnight=True, password='password'),
        User(
            username='dave_jones', email='dave.jones@aa.io', first_name='Dave', last_name='Jones', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/8512b4f33e95447db806cb48a74957b0.jpg', phone='555-555-5508', sitter=True, sitter_id=8, at_home=False, overnight=False, password='password'),
        User(
            username='emma_miller', email='emma.miller@aa.io', first_name='Emma', last_name='Miller', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/8512b4f33e95447db806cb48a74957b0.jpg', phone='555-555-5509', sitter=True, sitter_id=9, at_home=False, overnight=True, password='password'),
        User(
            username='frank_moore', email='frank.moore@aa.io', first_name='Frank', last_name='Moore', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/8512b4f33e95447db806cb48a74957b0.jpg', phone='555-555-5510', sitter=True, sitter_id=10, at_home=True, overnight=False, password='password'),
        User(
            username='grace_taylor', email='grace.taylor@aa.io', first_name='Grace', last_name='Taylor', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/8512b4f33e95447db806cb48a74957b0.jpg', phone='555-555-5511', sitter=True, sitter_id=11, at_home=True, overnight=True, password='password'),
        User(
            username='henry_anderson', email='henry.anderson@aa.io', first_name='Henry', last_name='Anderson', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/8512b4f33e95447db806cb48a74957b0.jpg', phone='555-555-5512', sitter=True, sitter_id=12, at_home=True, overnight=False, password='password'),
        User(
            username='irene_thomas', email='irene.thomas@aa.io', first_name='Irene', last_name='Thomas', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/8512b4f33e95447db806cb48a74957b0.jpg', phone='555-555-5513', sitter=True, sitter_id=13, at_home=True, overnight=True, password='password'),
        User(
            username='jack_wilson', email='jack.wilson@aa.io', first_name='Jack', last_name='Wilson', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/8512b4f33e95447db806cb48a74957b0.jpg', phone='555-555-5514', sitter=True, sitter_id=14, at_home=True, overnight=False, password='password'),
        User(
            username='kate_martinez', email='kate.martinez@aa.io', first_name='Kate', last_name='Martinez', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/8512b4f33e95447db806cb48a74957b0.jpg', phone='555-555-5515', sitter=True, sitter_id=15, at_home=True, overnight=True, password='password'),
        User(
            username='leo_clark', email='leo.clark@aa.io', first_name='Leo', last_name='Clark', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/8512b4f33e95447db806cb48a74957b0.jpg', phone='555-555-5516', sitter=True, sitter_id=16, at_home=False, overnight=True, password='password')
    ]

    db.session.add_all(demo_users)
    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
