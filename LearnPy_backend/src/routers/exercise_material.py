from flask import Blueprint, jsonify, request
from src.models.exercise_material import Exercise_Material
from functools import wraps

main = Blueprint('exercises_material_blueprint', __name__)

def handle_exceptions(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as ex:
            return jsonify({'message': str(ex)}), 500
    return wrapper

# Función auxiliar para obtener parámetros del JSON
def get_param(name, cast_type=str):
    return cast_type(request.json[name])

@main.route('/delete_exercise_material', methods=['POST'])
def delete_material():
    try:
        exercise_material_code = int(request.json['exercise_material_code'])
        rute = str(request.json['rute'])
        result, resp = Exercise_Material.delete_exercise_material(exercise_material_code, rute)
        return jsonify(result), resp
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

    
@main.route('/get_exercise_materials', methods=['POST'])
@handle_exceptions
def get_exercises_materials():
    exercise_code = get_param('exercise_code', int)
    result, resp = Exercise_Material.get_exercise_materials_by_exercise(exercise_code)
    return jsonify(result), resp
