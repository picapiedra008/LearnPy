from flask import Blueprint, jsonify, request
from src.models.user import User

main = Blueprint('users_blueprint', __name__)


@main.route('/login_user', methods=['POST'])
def login():
    try:
        email = str(request.json['email'])
        password = str(request.json['password'])
        type = int(request.json['type'])  
        if not email or not password:
            return jsonify({'message': 'user email and password are required'}), 400

        json, response = User.login(email, password, type)
        return jsonify(json), response
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/get_users', methods=['POST'])
def get_users():
    try:
        type = int(request.json['type'])
        users, resp = User.get_users(type)
        return jsonify(users), resp
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500    


@main.route('/get_user', methods=['POST'])
def get_user():
    try:
        code = int(request.json['code'])
        user, resp = User.get_user(code)
        return jsonify(user), resp
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@main.route('/delete_user', methods=['POST'])
def delete_user():
    try:
        code = int(request.json['code'])
        user, resp = User.delete_user(code)
        return jsonify(user), resp
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@main.route('/delete_users', methods=['POST'])
def delete_users():
    try:
        codes = request.json.get('codes', [])
        if not codes:
            return jsonify({'message': 'At least one code is required'}), 400

        
        codes = list(map(int, codes))
        users, resp = User.delete_users(codes)
        return jsonify(users), resp
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@main.route('/register_user', methods=['POST'])
def register_user():
    try:
        name = str(request.json['name']).title()
        email = str(request.json['email'])
        password = str(request.json['password'])
        type = int(request.json['type'])

        user, resp = User.register_user(name, email, password, type)
        return jsonify(user), resp
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@main.route('/edit_user', methods=['PUT'])
def edit_user():
    try:
        code = int(request.json['code'])
        name = str(request.json['name']).title()
        email = str(request.json['email'])
        type = int(request.json['type'])

        user, resp = User.edit_user(code, name, email, type)
        return jsonify(user), resp
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500
