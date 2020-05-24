using Microsoft.EntityFrameworkCore.Migrations;

namespace DesafioPomar.Migrations
{
    public partial class AdicionandoGrupoEmColheita : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "GrupoId",
                table: "Colheita",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_Colheita_GrupoId",
                table: "Colheita",
                column: "GrupoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Colheita_Grupo_GrupoId",
                table: "Colheita",
                column: "GrupoId",
                principalTable: "Grupo",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Colheita_Grupo_GrupoId",
                table: "Colheita");

            migrationBuilder.DropIndex(
                name: "IX_Colheita_GrupoId",
                table: "Colheita");

            migrationBuilder.DropColumn(
                name: "GrupoId",
                table: "Colheita");
        }
    }
}
