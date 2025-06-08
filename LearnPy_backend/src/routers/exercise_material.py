from flask import Blueprint, jsonify, request
from src.models.exercise_material import Exercise_Material

main = Blueprint('exercise_materials_blueprint', __name__)


@main.route('/delete_exercise_material', methods=['POST'])
def delete_material():
    try:
        exercise_material_code = int(request.json['exercise_material_code'])
        rute = str(request.json['rute'])
        result, resp = Exercise_Material.delete_exercise_material(exercise_material_code, rute)
        return jsonify(result), resp
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500
