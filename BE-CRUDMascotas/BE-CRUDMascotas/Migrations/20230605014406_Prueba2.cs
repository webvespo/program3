using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BE_CRUDMascotas.Migrations
{
    /// <inheritdoc />
    public partial class Prueba2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Mascotas_Usuarios_DueñoId",
                table: "Mascotas");

            migrationBuilder.DropIndex(
                name: "IX_Mascotas_DueñoId",
                table: "Mascotas");

            migrationBuilder.DropColumn(
                name: "DueñoId",
                table: "Mascotas");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DueñoId",
                table: "Mascotas",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Mascotas_DueñoId",
                table: "Mascotas",
                column: "DueñoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Mascotas_Usuarios_DueñoId",
                table: "Mascotas",
                column: "DueñoId",
                principalTable: "Usuarios",
                principalColumn: "Id");
        }
    }
}
