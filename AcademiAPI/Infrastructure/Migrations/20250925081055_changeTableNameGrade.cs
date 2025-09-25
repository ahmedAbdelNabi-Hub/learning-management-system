using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class changeTableNameGrade : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Grades_GradeId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Divisions_Grades_GradeId",
                table: "Divisions");

            migrationBuilder.DropTable(
                name: "Grades");

            migrationBuilder.DropIndex(
                name: "IX_Divisions_GradeId",
                table: "Divisions");

            migrationBuilder.AddColumn<int>(
                name: "StageId",
                table: "Divisions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Stages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stages", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Divisions_StageId",
                table: "Divisions",
                column: "StageId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Stages_GradeId",
                table: "AspNetUsers",
                column: "GradeId",
                principalTable: "Stages",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Divisions_Stages_StageId",
                table: "Divisions",
                column: "StageId",
                principalTable: "Stages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Stages_GradeId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Divisions_Stages_StageId",
                table: "Divisions");

            migrationBuilder.DropTable(
                name: "Stages");

            migrationBuilder.DropIndex(
                name: "IX_Divisions_StageId",
                table: "Divisions");

            migrationBuilder.DropColumn(
                name: "StageId",
                table: "Divisions");

            migrationBuilder.CreateTable(
                name: "Grades",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Grades", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Divisions_GradeId",
                table: "Divisions",
                column: "GradeId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Grades_GradeId",
                table: "AspNetUsers",
                column: "GradeId",
                principalTable: "Grades",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Divisions_Grades_GradeId",
                table: "Divisions",
                column: "GradeId",
                principalTable: "Grades",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
