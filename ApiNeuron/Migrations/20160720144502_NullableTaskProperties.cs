using Microsoft.EntityFrameworkCore.Migrations;

namespace ApiNeuron.Migrations
{
    public partial class NullableTaskProperties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "IsFinished",
                table: "Tasks",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "IsFinished",
                table: "Tasks",
                nullable: false);
        }
    }
}
