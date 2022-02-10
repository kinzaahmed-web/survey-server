from app import app

@app.route("/")
def index():
    return "Hello world"

@app.route("/survey")
def about():
    return "Survey time!"
