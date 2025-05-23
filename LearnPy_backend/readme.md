# 📘 API – Plataforma LearnPy

Este documento detalla los endpoints disponibles en la API del backend de LearnPy, organizados por módulos funcionales: Usuarios, Ejercicios, Lecciones y Materiales.

---

##  API de Usuarios

### Glosario

- email: Correo electrónico del usuario.
- password: Contraseña del usuario.
- type: Tipo de usuario
    - 1: Administrador
    - 2: Estudiante
    - 3: Docente
- code: Id de un usuario.
- codes: Arreglo de ids de usuarios.
- name: Nombre del usuario.

### Endpoints

### Dominios

```
Dominio local: http://127.0.0.1:5000/

Dominio global: 
```

#### Login de usuario
- **URL**: `/user/login_user`
- **Método**: `POST`
```json
{
  "email": "usuario@ejemplo.com",
  "password": "123456",
  "type": 2
}

Respuesta: Usuario autenticado
```
#### Obtener lista de usuarios por tipo
- **URL**: `/user/get_users`
- **Método**: `POST`
```json
{
  "type": 1
}
```
Respuesta: Lista de usuarios por tipo

#### Obtener usuario por codigo
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

##  API de Ejercicios

#### Crear ejercicio
- **URL**: `/exercise/create_exercise`
- **Método**: `POST`
```json
{
  "lesson_code": 101,
  "title": "Ejercicio 1",
  "instructions": "Resuelve el siguiente problema de variables.",
  "content": "print('Hola, Mundo')"
}
```
Respuesta: Ejercicio creado correctamente

#### Obtener ejercicios por lección
- **URL**: `/exercise/get_exercises`
- **Método**: `POST`
```json
{
  "lesson_code": 101
}
```
Respuesta: Lista de ejercicios asociados a la lección.

#### Actualizar ejercicio
- **URL**: `/exercise/update_exercise`
- **Método**: `PUT`
```json
{
  "exercise_code": 5,
  "lesson_code": 101,
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
---

##  API de Lecciones

#### Crear lección (con imagen)
- **URL**: `/lesson/create_lesson`
- **Método**: `POST`
**FormData**:
- `user_code`: int
- `level_code`: int
- `visibility_code`: int
- `title`: string
- `description`: string
- `front_page`: archivo (imagen)

Respuesta: La leccion a sido creada correctamente

#### Obtener lección por codigo
- **URL**: `/lesson/get_lesson`
- **Método**: `POST`
```json
{
  "lesson_code": 12
}
```
Respuesta: El codigo a sido obtenido correctamente

#### Actualizar lección (con archivo)
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

##  API de Materiales

#### Crear material
- **URL**: `/material/create_material`
- **Método**: `POST`
**FormData**:
- `lesson_code`: int  
- `material_type_code`: int  
- `material_name`: string  
- `file`: archivo  

Respuesta: El materia fue creado correctamente

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
- **Método**: `POST`

---
Respuesta: Los tipos de materiales fueron obtenidos correctamente