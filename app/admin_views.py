from app import app

@app.route("/admin/summary")
def admin_summary():
    return "Admin Summary"