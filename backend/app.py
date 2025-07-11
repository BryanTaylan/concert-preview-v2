from flask import Flask, jsonify, request, session
from flask_bcrypt import Bcrypt 
from flask_cors import CORS, cross_origin
from models import db, User, Reviews
from datetime import datetime, timezone


app = Flask(__name__)

app.config['SECRET_KEY'] = 'mysecretkey'
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///flaskdb.db"

SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
db.init_app(app)

with app.app_context():
    db.create_all()



@app.route("/")
def hello_world():
    return "<p>hello dihl<p>"

@app.route("/signup", methods = ["POST"])
def signup():
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email = email).first() is not None

    

    if user_exists:
        return jsonify({"error": "Email already exists"}), 409
    
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email = email, password = hashed_password)
    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })



@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email = email).first()

    if user is None:
        return jsonify({"error": "Unauthorized Access"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    return jsonify({
        "id": user.id,
        "email": user.email
    })

@app.route("/review", methods=["POST"])
def write_review():
    data = request.get_json()
    
    email =  data.get("email")
    user = User.query.filter_by(email = email).first()

    if user is None:
        return jsonify({"error": "Unauthorized Access"}), 401



    new_review = Reviews(
        email = user.email,
        rating = request.json.get("rating"),
        userTimestamp=datetime.now(timezone.utc),
        comment = request.json.get("comment"),
    )
    

    db.session.add(new_review)
    db.session.commit()
    db.session.close()


    return jsonify({
        "message": "Review added succesfully",
        "rating": request.json.get("rating"),
        "comment": request.json.get("comment")
    }), 201


if __name__ == "__main__":
    app.run(debug=True)