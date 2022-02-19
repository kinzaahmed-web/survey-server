from flask import Flask, render_template, request, g, redirect, url_for, jsonify
from datetime import datetime
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
    surveyor_name = request.form.get("surveyor_name")
    more_time_money = request.form.get("more_time_money")
    headache = request.form.get("headache")
    cereal = request.form.get("cereal")
    if (cereal != "yes"):
        cereal = "no"
    entertainment = request.form.get("entertainment")
    comic = request.form.get("comic")
    pc = request.form.get("pc")
    keyboard = request.form.get("keyboard")
    completion_date = datetime.now()
    survey = { 
        'surveyor_name': surveyor_name, 
        'completion_date': completion_date, 
        'more_time_money': more_time_money, 
        'headache': headache, 
        'cereal': cereal, 
        'entertainment': entertainment, 
        'comic': comic, 
        'pc': pc, 
        'keyboard': keyboard
    }
    # check if everything is filled out before passing to db
    if (value == None for value in survey.values()):
        return render_template("survey.html") 
    
    db.add_survey(survey)
    return redirect(url_for('thanks'))

@app.route("/decline")
def decline():
    return render_template("decline.html")

@app.route("/thanks")
def thanks():
    return render_template("thanks.html")

@app.route('/api/results', methods=['GET'])
def results():
    reverse = request.args.get("reverse", False)
    if (reverse != False):
        reverse = True if reverse.lower() == "true" else False
    return jsonify(db.get_survey_results(reverse))

@app.route("/admin/summary")
def summary():
    return render_template("summary.html")