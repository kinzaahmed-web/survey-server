from flask import Flask, render_template, request, g, redirect, url_for, jsonify
import db

app = Flask(__name__)

@app.before_first_request
def initialize():
    db.setup()

@app.route("/")
def index():
    return render_template("home.html")

@app.route("/survey", methods=['GET', 'POST'])
def survey():
    # print(request.form)
    surveyor_name = request.form.get("name")
    more_time_money = request.form.get("more_time_money")
    headache = request.form.get("headache")
    entertainment = request.get.form("netflix")
    comic = request.get.form("comic")
    pc = request.get.form("pc")
    keyboard = request.get.form("keyboard")
    print(surveyor_name, more_time_money, headache, entertainment, comic, pc, keyboard)
    # name = request.form.get("name", "unnamed friend")
    # db.add_person(name)
    return render_template("survey.html") 

@app.route("/decline")
def decline():
    return render_template("decline.html")

@app.route("/thanks")
def thanks():
    return render_template("thanks.html")

@app.route('/api/results', methods=['GET'])
def results():
    return render_template("results.html", results=db.get_survey_results())

@app.route("/admin/summary")
def summary():
    return render_template("summary.html")