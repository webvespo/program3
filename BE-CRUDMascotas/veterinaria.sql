USE [Veterinaria]
GO

-- Drop existing tables if they exist
IF OBJECT_ID('dbo.Mascotas', 'U') IS NOT NULL
    DROP TABLE [dbo].[Mascotas];
GO

IF OBJECT_ID('dbo.Usuarios', 'U') IS NOT NULL
    DROP TABLE [dbo].[Usuarios];
GO

IF OBJECT_ID('dbo.Propietarios', 'U') IS NOT NULL
    DROP TABLE [dbo].[Propietarios];
GO

IF OBJECT_ID('dbo.Raza', 'U') IS NOT NULL
    DROP TABLE [dbo].[Raza];
GO

-- Create Usuarios table
CREATE TABLE [dbo].[Usuarios](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [NombreUsuario] [nvarchar](max) NOT NULL,
    [Nombre] [nvarchar](max) NOT NULL,
    [Apellido] [nvarchar](max) NOT NULL,
    [Sexo] [nvarchar](max) NOT NULL,
    CONSTRAINT [PK_Usuarios] PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- Create Propietarios table
CREATE TABLE [dbo].[Propietarios](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [NombreUsuario] [nvarchar](max) NOT NULL,
    [Nombre] [nvarchar](max) NOT NULL,
    [Apellido] [nvarchar](max) NOT NULL,
    [Sexo] [nvarchar](max) NOT NULL,
    CONSTRAINT [PK_Propietarios] PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- Create Raza table
CREATE TABLE [dbo].[Raza](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [Nombre] [nvarchar](max) NULL,
    CONSTRAINT [PK_Raza] PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- Create Mascotas table
CREATE TABLE [dbo].[Mascotas](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [Nombre] [nvarchar](max) NOT NULL,
    [Color] [nvarchar](max) NOT NULL,
    [Edad] [int] NOT NULL,
    [Peso] [float] NOT NULL,
    [FechaCreacion] [datetime2](7) NOT NULL,
    [UsuarioId] [int] NOT NULL,
    [RazaId] [int] NOT NULL,
    CONSTRAINT [PK_Mascotas] PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- Add foreign key constraints
ALTER TABLE [dbo].[Mascotas] WITH CHECK ADD CONSTRAINT [FK_Mascotas_Usuarios] FOREIGN KEY([UsuarioId])
REFERENCES [dbo].[Usuarios] ([Id])
GO

ALTER TABLE [dbo].[Mascotas] CHECK CONSTRAINT [FK_Mascotas_Usuarios]
GO

ALTER TABLE [dbo].[Mascotas] WITH CHECK ADD CONSTRAINT [FK_Mascotas_Raza] FOREIGN KEY([RazaId])
REFERENCES [dbo].[Raza] ([Id])
GO

ALTER TABLE [dbo].[Mascotas] CHECK CONSTRAINT [FK_Mascotas_Raza]
GO

-- Insert sample data
INSERT INTO [dbo].[Usuarios] ([NombreUsuario], [Nombre], [Apellido], [Sexo])
VALUES ('user1', 'John', 'Doe', 'Male'), ('user2', 'Jane', 'Doe', 'Female')
GO

INSERT INTO [dbo].[Propietarios] ([NombreUsuario], [Nombre], [Apellido], [Sexo])
VALUES ('prop1', 'Alice', 'Smith', 'Female'), ('prop2', 'Bob', 'Johnson', 'Male')
GO

INSERT INTO [dbo].[Raza] ([Nombre])
VALUES ('Labrador'), ('Golden Retriever')
GO

INSERT INTO [dbo].[Mascotas] ([Nombre], [Color], [Edad], [Peso], [FechaCreacion], [UsuarioId], [RazaId])
VALUES
('Ciro', 'Marrón', 2, 25.0, '2022-03-13', 1, 1),
('Bartolo', 'Dorado', 3, 20.0, '2022-03-14', 2, 2)
GO