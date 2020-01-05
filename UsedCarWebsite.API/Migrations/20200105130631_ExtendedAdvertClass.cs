using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace UsedCarWebsite.API.Migrations
{
    public partial class ExtendedAdvertClass : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ContactInfo",
                table: "Adverts",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateCreated",
                table: "Adverts",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContactInfo",
                table: "Adverts");

            migrationBuilder.DropColumn(
                name: "DateCreated",
                table: "Adverts");
        }
    }
}
