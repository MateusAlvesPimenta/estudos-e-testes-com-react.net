using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FSReactNet.Migrations
{
    /// <inheritdoc />
    public partial class NewGroupDescriptionColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "GroupDescription",
                table: "Groups",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GroupDescription",
                table: "Groups");
        }
    }
}
