from flask import Blueprint, jsonify, request
from src.models.material import Material

main = Blueprint('materials_blueprint', __name__)

@main.route('/create_material', methods=['POST'])
def create_material():
    try:

        if 'front_page' not in request.files:
            return jsonify({'error': 'No file part (front_page)'}), 400
        
        lesson_code = int(request.form.get('lesson_code'))
        material_type_code = int(request.form.get('material_type_code'))
        material_name = int(request.form.get('material_name'))
        file = request.files['file']

        result, resp = Material.create_material(lesson_code, file, material_type_code, material_name)
        return jsonify(result), resp
    except Exception as ex:
        print("Error:", ex)
        return jsonify({'message': str(ex)}), 500


@main.route('/delete_material', methods=['POST'])
def delete_material():
    try:
        material_code = int(request.json['material_code'])
        rute = str(request.json['rute'])
        result, resp = Material.delete_material(material_code, rute)
        return jsonify(result), resp
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/get_materials_by_lesson', methods=['POST'])
def get_materials_by_lesson():
    try:
        lesson_code = int(request.json['lesson_code'])
        result, resp = Material.get_materials_by_lesson(lesson_code)
        return jsonify(result), resp
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@main.route('/get_material_types', methods=['GET'])
def get_material_types():
    try:
        result, resp = Material.get_material_types()
        return jsonify(result), resp
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500