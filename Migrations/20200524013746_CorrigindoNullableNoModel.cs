using Microsoft.EntityFrameworkCore.Migrations;

namespace DesafioPomar.Migrations
{
    public partial class CorrigindoNullableNoModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Colheita_Arvore_ArvoreId",
                table: "Colheita");

            migrationBuilder.DropForeignKey(
                name: "FK_Colheita_Grupo_GrupoId",
                table: "Colheita");

            migrationBuilder.AlterColumn<long>(
                name: "GrupoId",
                table: "Colheita",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<long>(
                name: "ArvoreId",
                table: "Colheita",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddForeignKey(
                name: "FK_Colheita_Arvore_ArvoreId",
                table: "Colheita",
                column: "ArvoreId",
                principalTable: "Arvore",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Colheita_Grupo_GrupoId",
                table: "Colheita",
                column: "GrupoId",
                principalTable: "Grupo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Colheita_Arvore_ArvoreId",
                table: "Colheita");

            migrationBuilder.DropForeignKey(
                name: "FK_Colheita_Grupo_GrupoId",
                table: "Colheita");

            migrationBuilder.AlterColumn<long>(
                name: "GrupoId",
                table: "Colheita",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(long),
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "ArvoreId",
                table: "Colheita",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(long),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Colheita_Arvore_ArvoreId",
                table: "Colheita",
                column: "ArvoreId",
                principalTable: "Arvore",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Colheita_Grupo_GrupoId",
                table: "Colheita",
                column: "GrupoId",
                principalTable: "Grupo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
