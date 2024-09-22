USE [Veterinaria]
GO

-- Create __EFMigrationsHistory table
CREATE TABLE [dbo].[__EFMigrationsHistory](
    [MigrationId] [nvarchar](150) NOT NULL,
    [ProductVersion] [nvarchar](32) NOT NULL,
    CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED ([MigrationId] ASC)
)
GO

-- Create Usuario table
CREATE TABLE [dbo].[Usuario](
    [id] [int] IDENTITY(1,1) NOT NULL,
    [nombre] [nvarchar](50) NULL,
    CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED ([id] ASC)
)
GO

-- Create Mascotas table
CREATE TABLE [dbo].[Mascotas](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [Raza] [nvarchar](max) NOT NULL,
    [Color] [nvarchar](max) NOT NULL,
    [Edad] [int] NOT NULL,
    [Peso] [real] NOT NULL,
    [FechaCreacion] [datetime2](7) NOT NULL,
    [Nombre] [nvarchar](max) NOT NULL,
    [UsuarioId] [int] NOT NULL,
    CONSTRAINT [PK_Mascotas] PRIMARY KEY CLUSTERED ([Id] ASC)
)
GO

-- Add default constraint for Nombre in Mascotas table
ALTER TABLE [dbo].[Mascotas] ADD CONSTRAINT [DF__Mascotas__Nombre__267ABA7A] DEFAULT (N'') FOR [Nombre]
GO

-- Add foreign key constraint
ALTER TABLE [dbo].[Mascotas] WITH CHECK ADD CONSTRAINT [FK_Mascotas_Usuario] FOREIGN KEY([UsuarioId])
REFERENCES [dbo].[Usuario] ([id])
GO

ALTER TABLE [dbo].[Mascotas] CHECK CONSTRAINT [FK_Mascotas_Usuario]
GO

-- Insert sample data (optional, based on your previous script)
INSERT INTO [dbo].[Usuario] ([nombre]) VALUES ('Sample User 1'), ('Sample User 2')
GO

INSERT INTO [dbo].[Mascotas] ([Raza], [Color], [Edad], [Peso], [FechaCreacion], [Nombre], [UsuarioId])
VALUES
('Labrador', 'Marrón', 2, 25, '2022-03-13', 'Ciro', 1),
('Golden', 'Dorado', 3, 20, '2022-03-14', 'Bartolo', 2)
GO