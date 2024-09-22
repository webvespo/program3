# Proyecto Veterinaria

Este proyecto consiste en una aplicación para gestionar una veterinaria.

## Requisitos previos

- .NET Core SDK
- Docker
- Yarn

## Configuración y ejecución

### Backend (.NET)

1. Restaurar dependencias:
   ```
   dotnet restore
   ```

2. Compilar el proyecto:
   ```
   dotnet build
   ```

3. Ejecutar el proyecto:
   ```
   dotnet run
   ```

### Base de datos (SQL Server)

Iniciar el contenedor de Docker:
```
docker-compose up -d
```

### Frontend

1. Instalar dependencias:
   ```
   yarn install
   ```

2. Iniciar la aplicación:
   ```
   yarn start
   ```

## Notas

- Asegúrese de que Docker esté en ejecución antes de iniciar el contenedor de la base de datos.
- El backend debe estar en ejecución para que el frontend funcione correctamente.