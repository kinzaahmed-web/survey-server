from app import app
from flask import render_template

@app.route("/")
def index():
    return render_template("home.html")

@app.route("/survey")
def survey():
    return render_template("survey.html")

@app.route("/decline")
def decline():
    return render_template("decline.html")

@app.route("/thanks")
def thanks():
    return render_template("thanks.html")

@app.route("/api/results")
def results():
    return render_template("results.html")

@app.route("/admin/summary")
def summary():
    return render_template("summary.html")
