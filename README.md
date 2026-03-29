# Peliculas CRUD

API REST con Spring Boot 3 y frontend con React.

## Tecnologias

**Backend**
- Java 17
- Spring Boot 3.5.12
- Spring Data JPA
- PostgreSQL 17
- Lombok

**Frontend**
- React 19
- TypeScript 5.9
- Vite 8
- Material UI 7
- React Router 7

---

## Requisitos

- Java 17
- Maven
- PostgreSQL 17
- Node.js 22

---

## Backend

1. Base de datos Postgres
```sql
CREATE DATABASE exam_gob;
```

2. Configurar `backend/peliiculas/src/main/resources/application.properties`
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/exam_gob
spring.datasource.username=TU_USUARIO
spring.datasource.password=TU_PASSWORD
```

---

## Frontend

1. Instalar dependencias
```bash
cd frontend
npm install
```

2. Archivo `.env`
```env
VITE_API_URL=http://localhost:8080/api
```

3. Ejecutar
```bash
npm run dev
```

Frontend en `http://localhost:5173`