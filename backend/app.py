from flask import Flask, make_response, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from marshmallow_sqlalchemy import SQLAlchemySchema
from marshmallow import fields, post_load
from flask_marshmallow import Marshmallow
from urllib.parse import quote



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:%s@localhost:3306/employees.db' % quote('R$@2022Dima')
db = SQLAlchemy(app)
ma = Marshmallow(app)

#create model employee
class employees(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    title = db.Column(db.String(100), nullable=False)

    def __init__(self, id, first_name, last_name, title):
        self.id = id
        self.first_name = first_name
        self.last_name = last_name
        self.title = title


    #print whenever we create a new employee
    def __repr__(self):
        return 'employees ' + str(self.id)


class EmployeeSchema(ma.Schema):
    class Meta:
        fields = ('id', 'first_name', 'last_name', 'title')

#init schema
employee_Schema = EmployeeSchema()
employees_Schema = EmployeeSchema(many=True)


#to get all user
@app.route('/employees', methods=['GET'])
def index():
    get_employees = employees.query.all()
    employees_schema = employees_Schema
    all_employees = employees_schema.dump(get_employees)
    return jsonify({"employees": all_employees})
    

#to post a user
@app.route('/new_employee', methods=['POST'])
def new_emplyee():
    id = request.json['id']
    first_name = request.json['first_name']
    last_name = request.json['last_name']
    title = request.json['title']

    new_emplyee = employees(id, first_name, last_name, title)
    db.session.add(new_emplyee)
    db.session.commit()

    return employee_Schema.jsonify(new_emplyee);







if __name__ == "__main__":
    app.run(debug=True)