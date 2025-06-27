# API – Plataforma LearnPy

Documentación de los endpoints disponibles en el backend de LearnPy, organizados por módulos funcionales: Usuarios, Ejercicios, Lecciones, Materiales, Tópicos y más.

---

## Tabla de Contenidos

- [API de Usuarios](#api-de-usuarios)
- [API de Ejercicios](#api-de-ejercicios)
- [API de Lecciones](#api-de-lecciones)
- [API de Materiales](#api-de-materiales)
- [API de Materiales de Ejercicio](#api-de-materiales-de-ejercicio)
- [API de Tópicos](#api-de-tópicos)
- [API de Validación de Código](#api-de-validación-de-código)
- [Dominios](#dominios)

---

## API de Usuarios

### Glosario
- **email**: Correo electrónico del usuario.
- **password**: Contraseña del usuario.
- **type**: Tipo de usuario (1: Administrador, 2: Estudiante, 3: Docente).
- **code**: ID del usuario.
- **codes**: Arreglo de IDs de usuarios.
- **name**: Nombre del usuario.

### Endpoints

#### Login de usuario
- **URL**: `/user/login_user`
- **Método**: `POST`
```json
{
  "email": "usuario@ejemplo.com",
  "password": "123456",
  "type": 2
}
```
Respuesta: Usuario autenticado

#### Obtener lista de usuarios por tipo
- **URL**: `/user/get_users`
- **Método**: `POST`
```json
{
  "type": 1
}
```
Respuesta: Lista de usuarios por tipo

#### Obtener usuario por código
- **URL**: `/user/get_user`
- **Método**: `POST`
```json
{
  "code": 12
}
```
Respuesta: Usuario con el código especificado

#### Eliminar usuario
- **URL**: `/user/delete_user`
- **Método**: `POST`
```json
{
  "code": 123
}
```
Respuesta: Usuario eliminado

#### Eliminar múltiples usuarios
- **URL**: `/user/delete_users`
- **Método**: `POST`
```json
{
  "codes": [2, 4, 5]
}
```
Respuesta: Usuarios eliminados

#### Registrar usuario
- **URL**: `/user/register_user`
- **Método**: `POST`
```json
{
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "password": "123456",
  "type": 2
}
```
Respuesta: Usuario registrado exitosamente

#### Editar usuario
- **URL**: `/user/edit_user`
- **Método**: `PUT`
```json
{
  "code": 123,
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "type": 3
}
```
Respuesta: Usuario actualizado correctamente
---
- **Descripción**:  
API de Usuarios: Gestiona operaciones relacionadas con los usuarios del sistema, incluyendo registro, inicio de sesión y recuperación de información del perfil.

## API de Ejercicios

#### Crear ejercicio
- **URL**: `/exercise/create_exercise`
- **Método**: `POST`
```json
{
  "topic_code": 101,
  "title": "Ejercicio 1",
  "instructions": "Resuelve el siguiente problema de variables.",
  "answer": "72",
  "initial_code": "####"
}
```
Respuesta: Ejercicio creado correctamente

#### Obtener ejercicios por tópico
- **URL**: `/exercise/get_exercises`
- **Método**: `POST`
```json
{
  "topic_code": 101
}
```
Respuesta: Lista de ejercicios asociados a la lección.

#### Actualizar ejercicio
- **URL**: `/exercise/update_exercise`
- **Método**: `PUT`
```json
{
  "exercise_code": 5,
  "topic_code": 101,
  "title": "Ejercicio 1 (Actualizado)",
  "instructions": "Completa el siguiente código.",
  "content": "print('Hola, Python')"
}
```
Respuesta: Ejercicio actualizado correctamente.

#### Eliminar ejercicio
- **URL**: `/exercise/delete_exercise`
- **Método**: `POST`
```json
{
  "exercise_code": 5
}
```
Respuesta: Ejercicio eliminado correctamente.

- **Descripción**:  
API de Ejercicios: Permite crear, editar, eliminar y consultar ejercicios asociados a lecciones o tópicos educativos.

## API de Lecciones

#### Crear lección
- **URL**: `/lesson/create_lesson`
- **Método**: `POST`
**FormData**:
- `user_code`, `level_code`, `visibility_code`, `title`, `description`, `front_page` (archivo)

Respuesta: La leccion a sido creada correctamente

#### Obtener lección por código
- **URL**: `/lesson/get_lesson`
- **Método**: `POST`
```json
{
  "lesson_code": 12
}
```
Respuesta: El codigo a sido obtenido correctamente

#### Actualizar lección
- **URL**: `/lesson/update_lesson`
- **Método**: `PUT`
**FormData**:
- `lesson_code`, `level_code`, `visibility_code`, `title`, `description`, `front_page`, `file`

Respuesta: la leccion fue actualizado correctamente

#### Eliminar lección
- **URL**: `/lesson/delete_lesson`
- **Método**: `POST`
```json
{
  "lesson_code": 12,
  "front_page": "ruta_del_archivo"
}
```
Respuesta: la leccion fue eliminado correctamente

#### Obtener niveles
- **URL**: `/lesson/get_levels`
- **Método**: `GET`

Respuesta: El nivel a sido obtenido correctamente

#### Obtener visibilidades
- **URL**: `/lesson/get_visibilities`
- **Método**: `GET`

Respuesta: Las visibilidades a sido obtenido correctamente

#### Obtener lecciones de un usuario
- **URL**: `/lesson/get_lessons`
- **Método**: `POST`
```json
{
  "user_code": 2
}
```
Respuesta: Las lecciones han sido obtenido correctamente
---
- **Descripción**:  
API de Lecciones: Administra las lecciones dentro de un tópico. Cada lección puede contener múltiples ejercicios y materiales de apoyo.


## API de Materiales

#### Crear material
- **URL**: `/material/create_material`
- **Método**: `POST`
**FormData**:
- `topic_code`, `material_type_code`, `material_name`, `file`

Respuesta: El materia fue creado correctamente

#### Crear material de ejercicio
- **URL**: `/material/create_material_of_exercise`
- **Método**: `POST`
**FormData**:
- `exercise_code`, `material_type_code`, `material_name`, `file`

Respuesta: El materia del ejercicio fue creado correctamente

#### Eliminar material
- **URL**: `/material/delete_material`
- **Método**: `POST`
```json
{
  "material_code": 1,
  "rute": "ruta_del_archivo"
}
```
Respuesta: El materia fue eliminado correctamente

#### Obtener materiales por lección
- **URL**: `/material/get_materials_by_lesson`
- **Método**: `POST`
```json
{
  "lesson_code": 101
}
```
Respuesta: Los materiales fueron obtenidos por leccion correctamente

#### Obtener tipos de material
- **URL**: `/material/get_material_types`
- **Método**: `GET`

---
Respuesta: Los tipos de materiales fueron obtenidos correctamente

## API de Materiales de Ejercicio

#### Eliminar material de ejercicio
- **URL**: `/exercise_material/delete_exercise_material`
- **Método**: `POST`
```json
{
  "exercise_material_code": 1,
  "rute": "ruta_del_archivo"
}
```
Respuesta: El materia de ejercicio fue eliminado correctamente
---

- **Descripción**:  
API de Exercise Materials: Relaciona materiales específicos con ejercicios individuales para reforzar el aprendizaje práctico.

## API de Tópicos

#### Crear tópico
- **URL**: `/lesson/topics`
- **Método**: `POST`
```json
{
  "lesson_code": 1,
  "topics": [
    {
      "index": 1,
      "topic_title": "Topic",
      "topic_description": "Description",
      "material_code": 4,
      "exercises": [3, 2]
    },
    {
      "index": 2,
      "topic_title": "Topic2",
      "topic_description": "Description2",
      "material_code": 5,
      "exercises": [5, 4]
    }
  ]
}
```
Respuesta: El Topico fue creado correctamente.

#### Eliminar tópico
- **URL**: `/topic/delete_topic`
- **Método**: `POST`
```json
{
  "topic_code": 5
}
```
Respuesta: Topico eliminado correctamente.
---

- **Descripción**:  
API de Tópicos: Organiza las unidades temáticas que agrupan lecciones relacionadas dentro del contenido de la plataforma.

## API de Validación de Código

### Validar código de ejercicio
- **URL**: `/validate_code`  
- **Método**: `POST`  
- **Body (JSON)**:
```json
{
  "enunciado": "Calcula el área de un círculo dado su radio.",
  "codigo": "def area_circulo(r): return 3.14 * r * r"
}
```

- **Respuesta (JSON)**:
```json
{
  "respuesta": "Correcto"
}
```

- **Descripción**:  
Este endpoint recibe un enunciado y un bloque de código Python. Luego, utiliza la función `Code.validate(enunciado, codigo)` para validar la solución enviada. Devuelve un mensaje indicando si la solución es correcta o incorrecta, junto con el código HTTP correspondiente.

- **Errores posibles**:
  - `500 Internal Server Error`: Si hay un fallo en la ejecución del validador.

## Dominios

```
Dominio local: http://127.0.0.1:5000/
Dominio global: 
```

## TCs de Alto Nivel del BackEnd

```
TC_VA_001: Validar código correcto contra enunciado válido
TC_VA_011: Enviar código que no cumple con el enunciado
TC_VA_111: Verificar si faltan campos en la solicitud
TC_VA_101: Tipos de datos incorrectos
TC_VA_110: Verificar error interno simulado
TC_VA_102: Validación de código en blanco
TC_EX_201: Crear ejercicio exitosamente
TC_EX_020: Crear ejercicio sin campo obligatorio
TC_EX_202: Obtener ejercicios por topic
TC_EX_022: Actualizar ejercicio
TC_EX_222: Eliminar ejercicio
TC_LE_003: Crear lección con archivo
TC_LE_301: Crear lección sin archivo
TC_LE_333: Obtener una lección
TC_LE_030: Agregar temas a lección
TC_LE_300: Actualizar lección
TC_LE_331: Eliminar lección individual
TC_LE_330: Eliminar múltiples lecciones
TC_LE_311: Obtener niveles
TC_LE_113: Obtener visibilidades
TC_LE_331: Obtener todas las lecciones de un usuario
```