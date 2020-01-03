using Microsoft.EntityFrameworkCore.Migrations;

namespace UsedCarWebsite.API.Migrations
{
    public partial class AddedAdvertStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AdvertStatus",
                table: "Adverts",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdvertStatus",
                table: "Adverts");
        }
    }
}
