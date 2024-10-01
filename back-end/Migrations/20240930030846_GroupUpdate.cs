using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FSReactNet.Migrations
{
    /// <inheritdoc />
    public partial class GroupUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "GroupName",
                table: "Groups",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "GroupDescription",
                table: "Groups",
                newName: "Description");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Groups",
                newName: "GroupName");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Groups",
                newName: "GroupDescription");
        }
    }
}
