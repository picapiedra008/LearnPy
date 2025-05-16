# API de Usuarios

## Glosario

- email: Correo electrónico del usuario.
- password: Contraseña del usuario.
- type: Tipo de usuario
    - 1: Administrador
    - 2: Estudiante
    - 3: Docente
- code: Id de un usuario.
- codes: Arreglo de ids de usuarios. 
- name: Nombre del usuario.

## Endpoints

## Dominios

```
Dominio local: http://127.0.0.1:5000/

Dominio global: 
```

### Login de usuario

URL: /login 
Método: POST  
Body JSON: 
```json
  {
    "email": "usuario@ejemplo.com",
    "password": "123456",
    "type": 2
  }
```

Respuesta: Usuario autenticado

### Obtener lista de usuarios por tipo

URL: /get_users  
Método: POST  
Body JSON:

```json
{
  "type": 1
}
```
Respuesta: Lista de usuarios por tipo

### Obtener un usuario por código

URL: /get_user  
Método: POST  
Body JSON:  

```json
{
  "code": 12
}
```

Respuesta: Usuario con el código especificado

### Eliminar un usuario

URL: /delete_user  
Método: POST  
Body JSON:  

```json
{
  "code": 123
}
```

Respuesta: Usuario eliminado


### Eliminar múltiples usuarios

URL: /delete_users  
Método: POST  
Body JSON: 

```json
{
  "codes": [2, 4, 5]
}
```

Respuesta: Usuarios eliminados

### Registrar un nuevo usuario

URL: /register_user  
Método: POST  
Body JSON:  

```json  
{
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "password": "123456",
  "type": 2
}
```

Respuesta: Usuario registrado exitosamente

### Editar un usuario

URL: /edit_user  
Método: PUT  
Body JSON:  

```json
{
  "code": 123,
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "type": 3
}
```

Respuesta: Usuario actualizado correctamente