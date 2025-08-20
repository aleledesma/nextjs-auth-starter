# Next.js & Prisma Postgres Auth Starter

Este repositorio provee una versión modificada del [Template Original](https://github.com/prisma/nextjs-auth-starter), ofreciendo los siguientes cambios / modificaciones:

## Cambios realizados al template original

### 🗑️ Eliminaciones

- Se eliminó la creación automática de usuarios al hacer `signIn` en NextAuth. Ahora solo se inicia sesión si el usuario ya existe.
- Se borró la ruta `/users/new`, ya que el registro se maneja mediante un form separado y un endpoint API.
  Esta ruta permitía a cualquiera crear nuevos usuarios.
- Se removió toda la lógica referente a posts para simplificar el template y enfocarlo en autenticación.

### ✨ Nuevas funcionalidades

- Creación de nuevos formularios de autenticación (`login` y `register`) usando **React Hook Form + Zod** para validación de datos.
- Creación de una ruta protegida `/dashboard` para ejemplificar autorización y acceso al rol de la sesión.
- Implementación de un endpoint API para crear usuarios en la base de datos.
- El formulario de registro utiliza este endpoint y luego redirige al `/dashboard`.
- Agregados roles básicos de usuario: `"admin"` y `"user"`.

### 🔧 Modificaciones y mejoras

- Estilos de los formularios de autenticación modificados para mejorar la UI/UX (login & register).
- Validación de datos de login ahora se realiza en el backend mediante la función `authorize` de NextAuth.
- Protección de rutas usando **middleware** de NextAuth.
- Refactor simple del proyecto para mejorar legibilidad y mantenimiento.
- Reestructuración y organización de carpetas de rutas usando **grouping**, por ejemplo: rutas de autenticación dentro de `(auth)` y rutas protegidas dentro de `(protected)`.

# Primeros pasos

## 1. Instalar dependencias

Después de clonar el repositorio y navegar dentro de él, instala las dependencias:

```
npm install
```

## 2. Crear una instancia de Prisma Postgres

Crea una instancia de Prisma Postgres ejecutando el siguiente comando:

```
npx prisma init --db
```

Este comando es interactivo y te pedirá que:

- Inicies sesión en la Prisma Console

- Selecciones una región para tu instancia de Prisma Postgres

- Le des un nombre a tu proyecto de Prisma

Una vez que el comando haya terminado, copia la URL de la Base de Datos de la salida de la terminal. La necesitarás en el siguiente paso para configurar tu archivo `.env`.

## 3. Configurar tu archivo .env

Ahora necesitas configurar la conexión a tu base de datos a través de una variable de entorno.

Primero, crea un archivo `.env`:

```bash
touch .env
```

Luego, actualiza el archivo `.env` reemplazando el valor existente de `DATABASE_URL` con el que copiaste previamente. Se verá similar a esto:

```bash
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=PRISMA_POSTGRES_API_KEY"
```

Para asegurar que tu autenticación funcione correctamente, también necesitarás configurar variables de entorno para NextAuth.js:

```bash
AUTH_SECRET="RANDOM_32_CHARACTER_STRING"
```

Puedes generar una cadena aleatoria de 32 caracteres para el secreto `AUTH_SECRET` con este comando:

```
npx auth secret
```

Al final, tu archivo `.env` completo debería verse similar a esto (pero usando tus propios valores para las variables de entorno):

```bash
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMWEzMjBiYTEtYjg2Yy00ZTA5LThmZTktZDBhODA3YjQwZjBkIiwidGVuYW50X2lkIjoiY2RhYmM3ZTU1NzdmMmIxMmM0ZTI1Y2IwNWJhZmZhZmU4NjAxNzkxZThlMzhlYjI1NDgwNmIzZjI5NmU1NTkzNiIsImludGVybmFsX3NlY3JldCI6ImI3YmQzMjFhLTY2ODQtNGRiMC05ZWRiLWIyMGE2ZTQ0ZDMwMSJ9.JgKXQBatjjh7GIG3_fRHDnia6bDv8BdwvaX5F-XdBfw"

AUTH_SECRET="gTwLSXFeNWFRpUTmxlRniOfegXYw445pd0k6JqXd7Ag="
```

### Usar tu propia base de datos Postgres

Si no deseas usar Prisma Postgres y Prisma Accelerate, puedes usar tu propia base de datos PostgreSQL. Solo necesitas seguir estos pasos:

Cambia la `DATABASE_URL` en tu archivo `.env` para que apunte a tu base de datos. Por ejemplo:

```
DATABASE_URL="postgresql://USER:PASS@HOST:PORT/DB_NAME?schema=public"
```

Asegúrate de reemplazar `USER`, `PASS`, `HOST`, `PORT` y `DB_NAME` con tus propios valores.

Modifica el archivo `/lib/prisma.ts`. En este archivo, busca la línea:

```
const prisma = new PrismaClient().$extends(withAccelerate())
```

Y elimínala o comenta el uso de `withAccelerate()` para que la línea quede así:

```
const prisma = new PrismaClient()
```

Esto detendrá el uso de Prisma Accelerate y permitirá que Prisma se conecte directamente a tu base de datos.

## 4. Migrar la base de datos

Ejecuta los siguientes comandos para configurar tu base de datos y el esquema de Prisma:

```bash
npx prisma migrate dev --name init
```

## 5. Cargar valores de ejemplo a la base de datos

Agrega datos iniciales a tu base de datos:

```bash
npx prisma db seed
```

## 6. Ejecutar la aplicación

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Una vez que el servidor esté en funcionamiento, visita `http://localhost:3000` para comenzar a usar la aplicación.

## Aclaración

Ante cualquier duda, siempre puedes acceder a la documentación del proyecto original:

- [Next.js & Prisma Postgres Auth Starter](https://github.com/prisma/nextjs-auth-starter/blob/main/README.md)
