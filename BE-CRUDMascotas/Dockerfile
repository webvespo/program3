# Use the official Microsoft .NET SDK image to build the project
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY ["BE-CRUDMascotas/BE-CRUDMascotas.csproj", "BE-CRUDMascotas/"]
RUN dotnet restore "BE-CRUDMascotas/BE-CRUDMascotas.csproj"

# Copy the rest of the code and build the project
COPY BE-CRUDMascotas .
WORKDIR "/src/BE-CRUDMascotas"
RUN dotnet build "BE-CRUDMascotas.csproj" -c Release -o /app/build

# Publish the application
FROM build AS publish
RUN dotnet publish "BE-CRUDMascotas.csproj" -c Release -o /app/publish

# Build the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BE-CRUDMascotas.dll"]