from flask import Blueprint, jsonify, request
from src.models.code import Code

main = Blueprint('code_blueprint', __name__)

@main.route('/validate_code', methods=['POST'])
def validate_code():
    try:
        enunciado = str(request.json['enunciado'])
        codigo = str(request.json['codigo'])

        respuesta, status = Code.validate(enunciado, codigo)
        return jsonify({'respuesta': respuesta}), status

    except Exception as ex:
        return jsonify({'respuesta': f'Error interno del servidor: {str(ex)}'}), 500
