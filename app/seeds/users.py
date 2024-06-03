from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from werkzeug.security import generate_password_hash


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo_users = [
        User(
            username='nate_hall', email='nate.hall@aa.io', first_name='Nate', last_name='Hall', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/4dead4e64d8e410bb7e0b8050a34f38c.png', phone='555-555-5517', sitter=False, at_home=None, overnight=None, password='password'),
        User(
            username='darnell_pumpernickel', email='darnell.pumpernickel@aa.io', first_name='Darnell', last_name='Pumpernickel', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/4dead4e64d8e410bb7e0b8050a34f38c.png', phone='555-555-5537', sitter=False, at_home=None, overnight=None, password='password'),
        User(
            username='olivia_harris', email='olivia.harris@aa.io', first_name='Olivia', last_name='Harris', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/4dead4e64d8e410bb7e0b8050a34f38c.png', phone='555-555-5518', sitter=False, at_home=None, overnight=None, password='password'),
        User(
            username='quinn_walker', email='quinn.walker@aa.io', first_name='Quinn', last_name='Walker', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/4dead4e64d8e410bb7e0b8050a34f38c.png', phone='555-555-5519', sitter=False, at_home=None, overnight=None, password='password'),
        User(
            username='rachel_scott', email='rachel.scott@aa.io', first_name='Rachel', last_name='Scott', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/4dead4e64d8e410bb7e0b8050a34f38c.png', phone='555-555-5520', sitter=False, at_home=None, overnight=None, password='password'),
        User(
            username='john_doe', email='john.doe@aa.io', first_name='John', last_name='Doe', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/1211e568519c4c368e3a502f09e67340.jpg', phone='555-555-5502', sitter=True, at_home=True, overnight=False, password='password'),
        User(
            username='jane_smith', email='jane.smith@aa.io', first_name='Jane', last_name='Smith', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/22c5df5a73fa4d80b8163082fc7195af.jpg', phone='555-555-5503', sitter=True, at_home=False,overnight=True, password='password'),
        User(
            username='demo_user', email='demo@aa.io', first_name='Demo', last_name='User', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/4dead4e64d8e410bb7e0b8050a34f38c.png', phone='555-555-5501', sitter=True, at_home=True, overnight=True, password='password'),
        User(
            username='wilfred_crocker', email='wilfred.crocker@aa.io', first_name='Wilfred', last_name='Crocker', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/b9511b8a42bd480283d39ed526ac6a8e.jpg', phone='555-555-5531', sitter=True, at_home=True, overnight=True, password='password'),
        User(
            username='alice_johnson', email='alice.johnson@aa.io', first_name='Alice', last_name='Johnson', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/cf1b4a0753c34960a053fe4efd9c0b9d.jpg', phone='555-555-5504', sitter=True, at_home=False, overnight=False, password='password'),
        User(
            username='bob_williams', email='bob.williams@aa.io', first_name='Bob', last_name='Williams', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/ce1a69eb9bab47d3be4e6481bbaf005e.jpg', phone='555-555-5505', sitter=True, at_home=True, overnight=True, password='password'),
        User(
            username='maya_lee', email='maya.lee@aa.io', first_name='Maya', last_name='Lee', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/ce8ef7e9be7247a09b89965799714822.jpg', phone='555-555-5507', sitter=True, at_home=True, overnight=True, password='password'),
        User(
            username='dave_jones', email='dave.jones@aa.io', first_name='Dave', last_name='Jones', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/b2343b03735d4f79aa347564fa5e35e3.jpg', phone='555-555-5508', sitter=True, at_home=False, overnight=False, password='password'),
        User(
            username='emma_miller', email='emma.miller@aa.io', first_name='Emma', last_name='Miller', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/b4171e7104d647f58beee357296cdbbc.jpg', phone='555-555-5509', sitter=True, at_home=False, overnight=True, password='password'),
        User(
            username='frank_moore', email='frank.moore@aa.io', first_name='Frank', last_name='Moore', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/3bf2c288f46d456988ad20bb60517314.jpg', phone='555-555-5510', sitter=True,  at_home=True, overnight=False, password='password'),
        User(
            username='grace_taylor', email='grace.taylor@aa.io', first_name='Grace', last_name='Taylor', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/9a246c5be7af4abd8c6e05c4dfd9c7b1.jpg', phone='555-555-5511', sitter=True,  at_home=True, overnight=True, password='password'),
        User(
            username='henry_anderson', email='henry.anderson@aa.io', first_name='Henry', last_name='Anderson', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/9c2cc011071a4f66859f7ae543ea41bb.jpg', phone='555-555-5512', sitter=True,  at_home=True, overnight=False, password='password'),
        User(
            username='irene_thomas', email='irene.thomas@aa.io', first_name='Irene', last_name='Thomas', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/dbf9a07f73a24b439142ab8ca41a8412.jpg', phone='555-555-5513', sitter=True,  at_home=True, overnight=True, password='password'),
        User(
            username='jack_wilson', email='jack.wilson@aa.io', first_name='Jack', last_name='Wilson', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/55b5ae4c702044c9b312bdaea96b7f39.jpg', phone='555-555-5514', sitter=True,  at_home=True, overnight=False, password='password'),
        User(
            username='kate_martinez', email='kate.martinez@aa.io', first_name='Kate', last_name='Martinez', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/c589183d1ad347eb8cad317a72e4f1ef.jpg', phone='555-555-5515', sitter=True,  at_home=True, overnight=True, password='password'),
        User(
            username='leo_clark', email='leo.clark@aa.io', first_name='Leo', last_name='Clark', profile_pic='https://marconi22-ollie.s3.us-east-2.amazonaws.com/d1ff112a8bd34623a0363bc4fa39b569.jpg', phone='555-555-5516', sitter=True,  at_home=False, overnight=True, password='password')
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
