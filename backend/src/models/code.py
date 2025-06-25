from src.utils.validate_code import validar_codigo

class Code():
    
    @classmethod
    def validate(cls, enunciado: str, codigo: str):
        try:
            resultado = validar_codigo(enunciado, codigo)

            if resultado is True:
                return 'El código ha sido validado correctamente.', 200
            elif resultado is False:
                return 'El código no cumple con lo solicitado en el enunciado.', 200
            else:
                return f'Error al validar el código: {resultado}', 400

        except Exception as e:
            return f'Ocurrió un error inesperado: {str(e)}', 500
