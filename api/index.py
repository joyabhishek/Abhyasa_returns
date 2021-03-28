from flask import Flask, current_app, g, session, request
import time
from sqlite3 import dbapi2 as sq3
import os
import hashlib

app = Flask(__name__)
app.secret_key = 'super secret key'


def getdb():
    # If the exists then fine else create new one
    db = getattr(g, 'db', None)
    if db is None:
        print("db is none")
        g.db = sq3.connect("Abhyasa.db")
        g.db.create_function("md5", 1, md5sum)
        g.db.row_factory = sq3.Row
    else:
        print("db is not none")
    return g.db


@app.teardown_appcontext
def closedb(exception):
    db = g.pop('db', None)
    print("Terminating app context")
    if db is not None:
        print("Closing db")
        db.close()


createUserTable = """

CREATE TABLE IF NOT EXISTS "users" (
"id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
"first_name" VARCHAR,
"last_name" VARCHAR,
"username" VARCHAR NOT NULL UNIQUE,
"password" VARCHAR NOT NULL
);


CREATE TABLE IF NOT EXISTS "habits" (
"id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
"name" VARCHAR NOT NULL,
"color" VARCHAR NOT NULL,
"reminder" VARCHAR NOT NULL,
"days" VARCHAR NOT NULL,
"mins" INTEGER NOT NULL,
"userID" INTEGER NOT NULL,
FOREIGN KEY (userID) REFERENCES users(id)
);


"""


def getUserId(username):
    db = getdb()
    uid = db.execute("SELECT id from users WHERE username=?;",
                     tuple((username,))).fetchone()[0]
    return uid


def habitExistsForUser(habitName):
    db = getdb()
    count = db.execute(
        'SELECT COUNT(*) FROM habits WHERE userID=? AND name=?', (getUserId(session["username"]), habitName)).fetchone()[0]
    if count == 1:
        print(f"Username exists:{True}")
        return True
    else:
        print(f"Username exists:{False}")
        return False


def validateHabitUserInput(name, color, reminder, days, mins):
    if name == "" or color == "" or reminder == "" or days == "" or mins == "":
        return {'result': False, 'msg': 'All fields are compulsary'}
    elif habitExistsForUser(name):
        print({'result': False, 'msg': 'Habit with the same name exists for the user'})
        return {'result': False, 'msg': f'Habit with the same name \"{name}\" exists for the user'}
    return {'result': True}


@app.route("/addHabit", methods=['POST'])
def addHabit():
    fetchHabitForCurrentUser()
    print(request.json)
    name = request.json['name']
    color = request.json['color']
    reminder = request.json['reminder']
    days = ",".join(request.json['days'])
    mins = request.json['mins']
    username = session["username"]
    print(f"Data type of reminder: {type(reminder)}")
    print(f"Data type of days: {type(days)}")
    res = validateHabitUserInput(name, color, reminder, days, mins)
    if res['result']:
        db = getdb()
        db.execute('INSERT INTO habits(name, color, reminder, days, mins, userID) VALUES (?, ?, ?, ?, ?, ?)',
                   (name, color, reminder, days, mins, getUserId(username)))
        showEntriesInUserdb()
        db.commit()
        return {'result': True, 'msg': f'Habit \"{name}\" register successfull'}
    else:
        return res


def fetchHabitForCurrentUser():
    username = session["username"]
    db = getdb()
    habits = db.execute('SELECT * from habits WHERE userID=?',
                        (getUserId(username),)).fetchall()
    for habit in habits:
        keys = habit.keys()
        s = ",".join([str(habit[k]) for k in keys])
        print(s)


def md5sum(t):
    return hashlib.md5(t.encode()).hexdigest()


def initdb():
    # Create a DB for Abhyasa App and run create table statement
    db = getdb()
    db.cursor().executescript(createUserTable)
    db.commit()
    return db


@app.route("/index")
def index():
    db = initdb()
    # registerUserdb('Abhi', 'Sen', 'i@ede.com', '1232424')
    for row in db.execute("SELECT * FROM users;").fetchall():
        print(row['username'], row['password'])
    print(f"User i@ede.com exists: {userExists('i@ede.com')}")
    return "Hello"


def validateRegisterUserInput(firstname,    lastname,    username,    password,    confirmpassword):
    if (firstname == "" or lastname == "" or username == "" or password == "" or confirmpassword == ""):
        return {'result': False, 'msg': 'All fields are compulsary'}
    elif(userExists(username)):
        return {'result': False, 'msg': f'{username} username already taken'}
    elif(not (password == confirmpassword)):
        return {'result': False, 'msg': 'Password and confirm password are not similar'}
    return {'result': True}


@ app.route('/register', methods=['POST'])
def registerUserdb():
    # On a new register add entry to db
    print(request.json)
    firstname = request.json['firstname']
    lastname = request.json['lastname']
    username = request.json['username']
    password = request.json['password']
    confirmpassword = request.json['confirmpassword']
    res = validateRegisterUserInput(
        firstname,    lastname,    username,    password,    confirmpassword)
    if res['result']:
        db = getdb()
        db.execute(
            'INSERT INTO users(first_name, last_name, username, password) VALUES (?, ?, ?, md5(?))', (firstname, lastname, username, password))
        showEntriesInUserdb()
        db.commit()
        return {'result': True, 'msg': 'Register successfull'}
    else:
        return res


def userExists(username):
    # Check when a user wants to register and that username already exists
    print(f"Username to verify:{username}")
    db = getdb()
    count = db.execute(
        'SELECT COUNT(*) FROM users WHERE username=?', tuple((username,))).fetchone()[0]
    if count == 1:
        print(f"Username exists:{True}")
        return True
    else:
        print(f"Username exists:{False}")
        return False
    # return true


def canUserLogin(username, password):
    db = getdb()

    count = db.execute(
        'SELECT COUNT(*) FROM users WHERE username=? AND password=?', tuple((username, md5sum(password)))).fetchone()[0]
    if count == 1:
        print("Atleat reaching here1")
        return True
    else:
        print("Atleat reaching here2")
        return False


@ app.route('/login', methods=['POST'])
def login():
    # Check for username and password for login
    print(request.json)
    username = request.json['username']
    password = request.json['password']
    if username == "" or password == "":
        return {'login': False, 'msg': "All fields are mandatory"}
    elif canUserLogin(username, password):
        print("Atleat reaching here3")
        session["username"] = username
        print(session)
        return {'login': True}
    else:
        print("Atleat reaching here4")
        return {'login': False, 'msg': "Invalid username and password"}


@ app.route('/logout')
def logout():
    # Check for username and password for login
    session.pop('username', None)
    return {'logout': True}


def showEntriesInUserdb():
    # Show entries in userdb
    db = initdb()
    for row in db.execute("SELECT * FROM users;").fetchall():
        print(row['first_name'], row['last_name'],
              row['username'], row['password'])


@ app.route('/isUserLoggedIn', methods=['GET'])
def isUserLoggedIn():
    if 'username' in session:
        print({'loggedIn': True})
        return {'loggedIn': True}
    else:
        print({'loggedIn': False})
        return {'loggedIn': False}


@ app.route('/time')
def get_current_time():
    return {'time': time.time()}
