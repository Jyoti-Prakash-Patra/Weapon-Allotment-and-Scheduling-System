# # === app.py ===
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import sqlite3

# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})

# # ---------------- DATABASE SETUP -----------------
# def init_db():
#     conn = sqlite3.connect("database.db")
#     cursor = conn.cursor()
#     cursor.execute("""
#     CREATE TABLE IF NOT EXISTS firing_records (
#         id INTEGER PRIMARY KEY AUTOINCREMENT,
#         employeeName TEXT,
#         employeeID TEXT,
#         weaponName TEXT,
#         weaponID TEXT,
#         date TEXT,
#         time TEXT,
#         firingPoint TEXT
#     )
#     """)
#     conn.commit()
#     conn.close()

# init_db()

# # ----------- SAVE -------------
# @app.route('/save', methods=['POST'])
# def save():
#     data = request.json
#     conn = sqlite3.connect("database.db")
#     cursor = conn.cursor()
#     cursor.execute("""
#         INSERT INTO firing_records 
#         (employeeName, employeeID, weaponName, weaponID, date, time, firingPoint)
#         VALUES (?, ?, ?, ?, ?, ?, ?)
#     """, (
#         data['employeeName'],
#         data['employeeID'],
#         data['weaponName'],
#         data['weaponID'],
#         data['date'],
#         data['time'],
#         data['firingPoint']
#     ))
#     conn.commit()
#     conn.close()
#     return jsonify({"message": "Record saved successfully"})

# # --------------- FETCH ALL ----------------
# @app.route('/all', methods=['GET'])
# def get_all():
#     conn = sqlite3.connect("database.db")
#     cursor = conn.cursor()
#     cursor.execute("SELECT * FROM firing_records")
#     rows = cursor.fetchall()
#     conn.close()
#     result = []
#     for row in rows:
#         result.append({
#             "id": row[0],
#             "employeeName": row[1],
#             "employeeID": row[2],
#             "weaponName": row[3],
#             "weaponID": row[4],
#             "date": row[5],
#             "time": row[6],
#             "firingPoint": row[7]
#         })
#     return jsonify(result)

# # -------------- FILTER SEARCH ---------------
# @app.route('/search', methods=['POST'])
# def search():
#     data = request.json
#     employee = data.get('employeeName', '')
#     weapon = data.get('weaponName', '')
#     date_from = data.get('dateFrom', '')
#     date_to = data.get('dateTo', '')

#     query = "SELECT * FROM firing_records WHERE 1=1"
#     params = []

#     if employee:
#         query += " AND employeeName LIKE ?"
#         params.append(f"%{employee}%")
#     if weapon:
#         query += " AND weaponName LIKE ?"
#         params.append(f"%{weapon}%")
#     if date_from:
#         query += " AND date >= ?"
#         params.append(date_from)
#     if date_to:
#         query += " AND date <= ?"
#         params.append(date_to)

#     conn = sqlite3.connect("database.db")
#     cursor = conn.cursor()
#     cursor.execute(query, params)
#     rows = cursor.fetchall()
#     conn.close()

#     result = []
#     for row in rows:
#         result.append({
#             "id": row[0],
#             "employeeName": row[1],
#             "employeeID": row[2],
#             "weaponName": row[3],
#             "weaponID": row[4],
#             "date": row[5],
#             "time": row[6],
#             "firingPoint": row[7]
#         })
#     return jsonify(result)

# # -------------- UPDATE --------------
# @app.route('/update', methods=['PUT'])
# def update():
#     data = request.json
#     conn = sqlite3.connect("database.db")
#     cursor = conn.cursor()
#     cursor.execute("""
#         UPDATE firing_records
#         SET employeeName=?, employeeID=?, weaponName=?, weaponID=?, date=?, time=?, firingPoint=?
#         WHERE id=?
#     """, (
#         data['employeeName'],
#         data['employeeID'],
#         data['weaponName'],
#         data['weaponID'],
#         data['date'],
#         data['time'],
#         data['firingPoint'],
#         data['id']
#     ))
#     conn.commit()
#     conn.close()
#     return jsonify({"message": "Record updated successfully"})

# # -------------- DELETE -------------
# @app.route('/delete/<int:id>', methods=['DELETE'])
# def delete(id):
#     conn = sqlite3.connect("database.db")
#     cursor = conn.cursor()
#     cursor.execute("DELETE FROM firing_records WHERE id=?", (id,))
#     conn.commit()
#     conn.close()
#     return jsonify({"message": "Record deleted successfully"})


# @app.route('/delete_filtered', methods=['OPTIONS'])
# def options_delete_filtered():
#     response = jsonify({"message": "CORS preflight success"})
#     response.headers.add("Access-Control-Allow-Origin", "*")
#     response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
#     response.headers.add("Access-Control-Allow-Headers", "Content-Type")
#     return response, 200


# @app.route('/delete_filtered', methods=['POST'])
# def delete_filtered():
#     try:
#         data = request.json
#         employee = data.get('employeeName', '')
#         weapon = data.get('weaponName', '')
#         date_from = data.get('dateFrom', '')
#         date_to = data.get('dateTo', '')

#         base_condition = " WHERE 1=1"
#         params = []

#         if employee:
#             base_condition += " AND employeeName = ?"
#             params.append(employee)
#         if weapon:
#             base_condition += " AND weaponName = ?"
#             params.append(weapon)
#         if date_from:
#             base_condition += " AND date >= ?"
#             params.append(date_from)
#         if date_to:
#             base_condition += " AND date <= ?"
#             params.append(date_to)

#         conn = sqlite3.connect("database.db")
#         cursor = conn.cursor()
#         cursor.execute("SELECT COUNT(*) FROM firing_records" + base_condition, params)
#         count = cursor.fetchone()[0]

#         if count == 0:
#             conn.close()
#             response = jsonify({"message": "The information is not found."})
#         else:
#             cursor.execute("DELETE FROM firing_records" + base_condition, params)
#             conn.commit()
#             conn.close()
#             response = jsonify({"message": "Filtered records deleted successfully."})

#         response.headers.add("Access-Control-Allow-Origin", "*")
#         return response

#     except Exception as e:
#         response = jsonify({"message": f"Server error: {str(e)}"})
#         response.status_code = 500
#         response.headers.add("Access-Control-Allow-Origin", "*")
#         return response


# # ------------ MAIN ----------------
# if __name__ == "__main__":
#     app.run(debug=True, port=5000)



from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# ---------------- DATABASE SETUP -----------------
def init_db():
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS firing_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        employeeName TEXT,
        employeeID TEXT,
        weaponName TEXT,
        weaponID TEXT,
        date TEXT,
        time TEXT,
        firingPoint TEXT
    )
    """)
    conn.commit()
    conn.close()

init_db()

# ----------------- SERVE FRONTEND ------------------
@app.route('/')
def home():
    return send_from_directory('HTML', 'Login.html')

@app.route('/HTML/<path:filename>')
def serve_html(filename):
    return send_from_directory('HTML', filename)

@app.route('/CSS/<path:filename>')
def serve_css(filename):
    return send_from_directory('CSS', filename)

@app.route('/JS/<path:filename>')
def serve_js(filename):
    return send_from_directory('JS', filename)

@app.route('/Assets/<path:filename>')
def serve_assets(filename):
    return send_from_directory('Assets', filename)

# ------------------- API ROUTES ----------------------

@app.route('/save', methods=['POST'])
def save():
    data = request.json
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO firing_records 
        (employeeName, employeeID, weaponName, weaponID, date, time, firingPoint)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        data['employeeName'],
        data['employeeID'],
        data['weaponName'],
        data['weaponID'],
        data['date'],
        data['time'],
        data['firingPoint']
    ))
    conn.commit()
    conn.close()
    return jsonify({"message": "Record saved successfully"})

@app.route('/all', methods=['GET'])
def get_all():
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM firing_records")
    rows = cursor.fetchall()
    conn.close()
    result = [{
        "id": row[0],
        "employeeName": row[1],
        "employeeID": row[2],
        "weaponName": row[3],
        "weaponID": row[4],
        "date": row[5],
        "time": row[6],
        "firingPoint": row[7]
    } for row in rows]
    return jsonify(result)

@app.route('/search', methods=['POST'])
def search():
    data = request.json
    employee = data.get('employeeName', '')
    weapon = data.get('weaponName', '')
    date_from = data.get('dateFrom', '')
    date_to = data.get('dateTo', '')

    query = "SELECT * FROM firing_records WHERE 1=1"
    params = []

    if employee:
        query += " AND employeeName LIKE ?"
        params.append(f"%{employee}%")
    if weapon:
        query += " AND weaponName LIKE ?"
        params.append(f"%{weapon}%")
    if date_from:
        query += " AND date >= ?"
        params.append(date_from)
    if date_to:
        query += " AND date <= ?"
        params.append(date_to)

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()

    result = [{
        "id": row[0],
        "employeeName": row[1],
        "employeeID": row[2],
        "weaponName": row[3],
        "weaponID": row[4],
        "date": row[5],
        "time": row[6],
        "firingPoint": row[7]
    } for row in rows]
    return jsonify(result)

@app.route('/update', methods=['PUT'])
def update():
    data = request.json
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE firing_records
        SET employeeName=?, employeeID=?, weaponName=?, weaponID=?, date=?, time=?, firingPoint=?
        WHERE id=?
    """, (
        data['employeeName'],
        data['employeeID'],
        data['weaponName'],
        data['weaponID'],
        data['date'],
        data['time'],
        data['firingPoint'],
        data['id']
    ))
    conn.commit()
    conn.close()
    return jsonify({"message": "Record updated successfully"})

@app.route('/delete/<int:id>', methods=['DELETE'])
def delete(id):
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("DELETE FROM firing_records WHERE id=?", (id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Record deleted successfully"})

@app.route('/delete_filtered', methods=['OPTIONS'])
def options_delete_filtered():
    response = jsonify({"message": "CORS preflight success"})
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type")
    return response, 200

@app.route('/delete_filtered', methods=['POST'])
def delete_filtered():
    try:
        data = request.json
        employee = data.get('employeeName', '')
        weapon = data.get('weaponName', '')
        date_from = data.get('dateFrom', '')
        date_to = data.get('dateTo', '')

        base_condition = " WHERE 1=1"
        params = []

        if employee:
            base_condition += " AND employeeName = ?"
            params.append(employee)
        if weapon:
            base_condition += " AND weaponName = ?"
            params.append(weapon)
        if date_from:
            base_condition += " AND date >= ?"
            params.append(date_from)
        if date_to:
            base_condition += " AND date <= ?"
            params.append(date_to)

        conn = sqlite3.connect("database.db")
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM firing_records" + base_condition, params)
        count = cursor.fetchone()[0]

        if count == 0:
            conn.close()
            response = jsonify({"message": "The information is not found."})
        else:
            cursor.execute("DELETE FROM firing_records" + base_condition, params)
            conn.commit()
            conn.close()
            response = jsonify({"message": "Filtered records deleted successfully."})

        response.headers.add("Access-Control-Allow-Origin", "*")
        return response

    except Exception as e:
        response = jsonify({"message": f"Server error: {str(e)}"})
        response.status_code = 500
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response

# ------------ MAIN (for local only) ----------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host="0.0.0.0", port=port)
