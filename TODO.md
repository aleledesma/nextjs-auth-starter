### `Cambios al Template :`

- [x] Eliminar que al hacer signIn, si no existe el usuario, se cree.

- [x] Borrar ruta /users/new

---

> (El form de registro solo debería crear el usuario en la db, y al hacerlo redirigir al /login, por ende la función authorize de next auth solo se encarga de el inicio de sesión, ya que la única forma de acceder es mediante el login (no se crea la sesión directamente luego de completar el registro)

- [x] Crear nuevos forms auth, validando datos (react-hook-form + zod)
- [x] Crear un api endpoint que cree un nuevo usuario en la db
- [x] El register form debe usar esta api, y luego redireccionar a /login

---

- [x] Modificar estilos de los auth forms (login & register)

- [x] Proteger rutas con el middleware de next auth

- [x] Validar datos de login en el backend (authorize nextauth function)

- [x] Eliminar lógica referida a posts para dejar el template más limpio

- [x] Agregar roles básicos: ej: "admin" y "user"

- [ ] Agregar ruta protegida /dashboard para ejemplificar autorización

- [ ] Agregar autentificación mediante Google provider

- [ ] Refactoring simple

- [ ] Instalar prettier, configurar reglas, y hacer un formateo de todo el proyecto

- [ ] Reestructurar / organizar routes folders usando grouping ej: auth routes dentro del (auth), rutas protegidas dentro de (protected)
