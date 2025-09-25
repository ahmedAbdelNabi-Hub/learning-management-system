using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class updateTableCity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Governorates",
                newName: "GovernorateNameEn");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Districts",
                newName: "CityNameEn");

            migrationBuilder.AddColumn<string>(
                name: "GovernorateNameAr",
                table: "Governorates",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CityNameAr",
                table: "Districts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GovernorateNameAr",
                table: "Governorates");

            migrationBuilder.DropColumn(
                name: "CityNameAr",
                table: "Districts");

            migrationBuilder.RenameColumn(
                name: "GovernorateNameEn",
                table: "Governorates",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "CityNameEn",
                table: "Districts",
                newName: "Name");
        }
    }
}
