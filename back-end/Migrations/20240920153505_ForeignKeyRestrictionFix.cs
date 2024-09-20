using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FSReactNet.Migrations
{
    /// <inheritdoc />
    public partial class ForeignKeyRestrictionFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Groups_GroupId",
                table: "Contacts");

            migrationBuilder.AlterColumn<int>(
                name: "GroupId",
                table: "Contacts",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_Groups_GroupId",
                table: "Contacts",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Groups_GroupId",
                table: "Contacts");

            migrationBuilder.AlterColumn<int>(
                name: "GroupId",
                table: "Contacts",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_Groups_GroupId",
                table: "Contacts",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
