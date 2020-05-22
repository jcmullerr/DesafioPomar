using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DesafioPomar.Migrations
{
    public partial class PrimeiraBase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Especie",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descricao = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Especie", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Grupo",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(maxLength: 200, nullable: true),
                    Descricao = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Grupo", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Arvore",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descricao = table.Column<string>(maxLength: 200, nullable: true),
                    Idade = table.Column<int>(nullable: false),
                    EspecieId = table.Column<long>(nullable: false),
                    GrupoId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Arvore", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Arvore_Especie_EspecieId",
                        column: x => x.EspecieId,
                        principalTable: "Especie",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Arvore_Grupo_GrupoId",
                        column: x => x.GrupoId,
                        principalTable: "Grupo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Colheita",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Informacoes = table.Column<string>(nullable: true),
                    DataColheita = table.Column<DateTime>(nullable: false),
                    PesoBruto = table.Column<decimal>(nullable: false),
                    ArvoreId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Colheita", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Colheita_Arvore_ArvoreId",
                        column: x => x.ArvoreId,
                        principalTable: "Arvore",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Arvore_EspecieId",
                table: "Arvore",
                column: "EspecieId");

            migrationBuilder.CreateIndex(
                name: "IX_Arvore_GrupoId",
                table: "Arvore",
                column: "GrupoId");

            migrationBuilder.CreateIndex(
                name: "IX_Colheita_ArvoreId",
                table: "Colheita",
                column: "ArvoreId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Colheita");

            migrationBuilder.DropTable(
                name: "Arvore");

            migrationBuilder.DropTable(
                name: "Especie");

            migrationBuilder.DropTable(
                name: "Grupo");
        }
    }
}
