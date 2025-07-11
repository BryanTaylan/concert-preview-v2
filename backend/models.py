from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
 
db = SQLAlchemy()
 
def get_uuid():
    return uuid4().hex
 
class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(11), primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.Text, nullable=False)

class Reviews(db.Model):
    __tablename__="reviews"
    id = db.Column(db.String(36), primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(150))
    rating = db.Column(db.Integer, nullable = True)
    userTimestamp = db.Column(db.DateTime)
    comment = db.Column(db.String(500))