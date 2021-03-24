from flask_login import UserMixin
from api import login


class User(UserMixin, db.Model):


@login.user_loader
def load_user(id):
    return User.query.get(int(id))
