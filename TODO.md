`* Cambios al Template :`

- [ ] Eliminar que al hacer signIn, si no existe el usuario, se cree.

- [ ] Borrar ruta /users/new

(El form de registro solo debería crear el usuario en la db, y al hacerlo redirigir al /login, por ende la función authorize de next auth solo se encarga de el inicio de sesión, ya que la única forma de acceder es mediante el login (no se crea la sesión directamente luego de completar el registro)

- [ ] Crear nuevos forms auth, validando datos (react-hook-form)
- [ ] Crear un api endpoint que cree un nuevo usuario en la db
- [ ] El register form debe usar esta api, y luego redireccionar a /login

- [ ] Al crear un post sin estar logueado no se maneja el error desde el front, por lo cual se rompe todo. Solucionar, aunque de igual manera esta sería un ruta protegida

- [ ] Proteger rutas con el middleware de next auth

- [ ] Instalar prettier, configurar reglas, y hacer un formateo de todo el proyecto
