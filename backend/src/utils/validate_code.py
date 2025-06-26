import requests
import time
import os 

headers = {
    "Authorization": f"Bearer {os.getenv('IA_API_KEY')}",
    "Content-Type": "application/json"
}

def validar_codigo(enunciado: str, codigo: str, modelo="meta-llama/llama-3.2-1b-instruct:free", max_tokens=10, max_reintentos=3):
    prompt = f"""
A continuación se presentan un enunciado y un código fuente. Tu tarea es verificar si el código cumple exactamente con lo indicado en el enunciado.

Responde únicamente con una solo caracter: **v** si el código cumple con el enunciado, o **f** si no lo cumple. No proporciones explicaciones ni texto adicional.

### ENUNCIADO:
{enunciado}

### CÓDIGO:
{codigo}
"""

    for intento in range(max_reintentos):
        data = {
            "model": modelo,
            "max_tokens": max_tokens,
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        }

        response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=data)

        if response.status_code == 200:
            respuesta = response.json()
            if "choices" in respuesta:
                contenido = respuesta["choices"][0]["message"]["content"].strip().lower()
                print(contenido)
                if "v" in contenido:
                    return True
                elif "f" in contenido:
                    return False
                else:
                    print(f"Reintento {intento + 1}: respuesta inesperada -> '{contenido}'")
                    time.sleep(5)
            else:
                return "Error: la respuesta no contiene 'choices'."
        elif response.status_code == 402:
            return "Error 402: créditos insuficientes o max_tokens muy alto."
        else:
            return f"Error {response.status_code}: {response.text}"

    return "Error: no se pudo obtener una respuesta válida tras varios intentos."




if __name__ == "__main__":
    enunciado = "Encontrar el número mayor en una lista"
    codigo = """
numeros = [5, 12, 3, 8, 19, 7]
mayor = numeros[0]
for num in numeros:
    if num > mayor:
        mayor = num
print(f"El número mayor es: {mayor}")
"""

    resultado = validar_codigo(enunciado, codigo)
    print("Respuesta de la IA:", resultado)
