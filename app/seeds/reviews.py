from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    # Reviews for Demo Sitter (Sitter ID: 1)
    reviews_sitter_1 = [
        Review(pet_id=1, sitter_id=1, review="Great experience!", rating=5),
        Review(pet_id=5, sitter_id=1, review="Charlie had a great time!", rating=5),
        Review(pet_id=8, sitter_id=1, review="Buddy needed medication and they handled it perfectly.", rating=5),
        Review(pet_id=2, sitter_id=1, review="Very attentive sitter!", rating=5),
        Review(pet_id=3, sitter_id=1, review="Max loved his stay!", rating=5),
        Review(pet_id=9, sitter_id=1, review="Rocky had a lot of fun!", rating=4)
    ]

    # Reviews for John Doe (Sitter ID: 2)
    reviews_sitter_2 = [
        Review(pet_id=2, sitter_id=2, review="Very attentive sitter!", rating=4),
        Review(pet_id=3, sitter_id=2, review="Max loved his stay!", rating=5),
        Review(pet_id=9, sitter_id=2, review="Rocky had a lot of fun!", rating=4),
        Review(pet_id=8, sitter_id=2, review="Could have been more responsive.", rating=2)
    ]

    # Reviews for Jane Smith (Sitter ID: 3)
    reviews_sitter_3 = [
        Review(pet_id=4, sitter_id=3, review="Lucy was well taken care of.", rating=3),
        Review(pet_id=7, sitter_id=3, review="Molly was happy and healthy.", rating=4),
        Review(pet_id=10, sitter_id=3, review="Sadie was very comfortable.", rating=4),
        Review(pet_id=8, sitter_id=3, review="Didn't answer my calls for over 30 minutes!!", rating=1)
    ]

    # Reviews for Alice Johnson (Sitter ID: 4)
    reviews_sitter_4 = [
        Review(pet_id=1, sitter_id=4, review="Exceptional care!", rating=4),
        Review(pet_id=2, sitter_id=4, review="Will definitely book again!", rating=5),
        Review(pet_id=3, sitter_id=4, review="Highly recommend!", rating=5)
    ]

    # Reviews for Bob Williams (Sitter ID: 5)
    reviews_sitter_5 = [
        Review(pet_id=4, sitter_id=5, review="Pet was very happy!", rating=5),
        Review(pet_id=5, sitter_id=5, review="Went above and beyond!", rating=5),
        Review(pet_id=6, sitter_id=5, review="Great communication!", rating=4),
        Review(pet_id=8, sitter_id=5, review="Needed to be reminded of Buddy's medication!", rating=1)
    ]

    # Reviews for Carol Brown (Sitter ID: 6)
    reviews_sitter_6 = [
        Review(pet_id=7, sitter_id=6, review="Very reliable!", rating=5),
        Review(pet_id=8, sitter_id=6, review="Caring and attentive!", rating=4),
        Review(pet_id=9, sitter_id=6, review="Fantastic job!", rating=5)
    ]

    # Reviews for Maya Lee (Sitter ID: 7)
    reviews_sitter_7 = [
        Review(pet_id=10, sitter_id=7, review="Pet was very relaxed!", rating=5),
        Review(pet_id=1, sitter_id=7, review="Great experience overall!", rating=5),
        Review(pet_id=2, sitter_id=7, review="Very attentive and caring!", rating=4)
    ]

    # Reviews for Dave Jones (Sitter ID: 8)
    reviews_sitter_8 = [
        Review(pet_id=3, sitter_id=8, review="Max had a wonderful stay!", rating=5),
        Review(pet_id=4, sitter_id=8, review="Lucy was pampered!", rating=4),
        Review(pet_id=5, sitter_id=8, review="Charlie enjoyed every moment!", rating=5),
        Review(pet_id=8, sitter_id=8, review="Needed to be reminded of Buddy's medication!", rating=1)

    ]

    # Reviews for Emma Miller (Sitter ID: 9)
    reviews_sitter_9 = [
        Review(pet_id=6, sitter_id=9, review="Daisy was well taken care of!", rating=5),
        Review(pet_id=7, sitter_id=9, review="Molly was happy and playful!", rating=4),
        Review(pet_id=8, sitter_id=9, review="Buddy received excellent care!", rating=5)
    ]

    # Reviews for Frank Moore (Sitter ID: 10)
    reviews_sitter_10 = [
        Review(pet_id=9, sitter_id=10, review="Rocky had the best time!", rating=5),
        Review(pet_id=10, sitter_id=10, review="Sadie was very comfortable!", rating=4),
        Review(pet_id=1, sitter_id=10, review="Louie was treated like family!", rating=5)
    ]

        # Reviews for Grace Taylor (Sitter ID: 11)
    reviews_sitter_11 = [
        Review(pet_id=2, sitter_id=11, review="Grace was amazing with Bella!", rating=5),
        Review(pet_id=3, sitter_id=11, review="Max loved his time with Grace.", rating=4),
        Review(pet_id=4, sitter_id=11, review="Lucy was very happy with Grace.", rating=5)
    ]

    # Reviews for Henry Anderson (Sitter ID: 12)
    reviews_sitter_12 = [
        Review(pet_id=5, sitter_id=12, review="Henry did a great job with Charlie.", rating=5),
        Review(pet_id=6, sitter_id=12, review="Daisy enjoyed her time with Henry.", rating=4),
        Review(pet_id=7, sitter_id=12, review="Henry took excellent care of Molly.", rating=5)
    ]

    # Reviews for Irene Thomas (Sitter ID: 13)
    reviews_sitter_13 = [
        Review(pet_id=8, sitter_id=13, review="Irene was very attentive to Buddy.", rating=4),
        Review(pet_id=9, sitter_id=13, review="Rocky had a great time with Irene.", rating=4),
        Review(pet_id=10, sitter_id=13, review="Sadie felt very comfortable with Irene.", rating=5)
    ]

    # Reviews for Jack Wilson (Sitter ID: 14)
    reviews_sitter_14 = [
        Review(pet_id=1, sitter_id=14, review="Jack was excellent with Louie.", rating=5),
        Review(pet_id=2, sitter_id=14, review="Bella enjoyed her time with Jack.", rating=4),
        Review(pet_id=3, sitter_id=14, review="Max had a wonderful experience with Jack.", rating=5)
    ]

    # Reviews for Kate Martinez (Sitter ID: 15)
    reviews_sitter_15 = [
        Review(pet_id=4, sitter_id=15, review="Kate was very good with Lucy.", rating=5),
        Review(pet_id=5, sitter_id=15, review="Charlie loved his time with Kate.", rating=5),
        Review(pet_id=6, sitter_id=15, review="Kate took great care of Daisy.", rating=4),
        Review(pet_id=8, sitter_id=15, review="I've never seen Buddy as shy as when he came home!", rating=2)

    ]

    # Reviews for Leo Clark (Sitter ID: 16)
    reviews_sitter_16 = [
        Review(pet_id=7, sitter_id=16, review="Leo was very reliable with Molly.", rating=5),
        Review(pet_id=8, sitter_id=16, review="Buddy felt comfortable with Leo.", rating=4),
        Review(pet_id=9, sitter_id=16, review="Rocky had a fantastic time with Leo.", rating=5)
    ]

    # Combine all reviews into a single list
    all_reviews = reviews_sitter_1 + reviews_sitter_2 + reviews_sitter_3 + reviews_sitter_4 + reviews_sitter_5 + reviews_sitter_6 + reviews_sitter_7 + reviews_sitter_8 + reviews_sitter_9 + reviews_sitter_10 + reviews_sitter_11 + reviews_sitter_12 + reviews_sitter_13 + reviews_sitter_14 + reviews_sitter_15 + reviews_sitter_16

    # Add all reviews to the session and commit
    db.session.add_all(all_reviews)
    db.session.commit()



def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
