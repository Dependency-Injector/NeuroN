using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ApiNeuron.Migrations
{
    public partial class UserProgress : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Progresses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AssociatedEntityId = table.Column<int>(nullable: true),
                    Occured = table.Column<DateTime>(nullable: false),
                    Source = table.Column<int>(nullable: false),
                    Xp = table.Column<decimal>(nullable: false),
                    XpMultiplier = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Progresses", x => x.Id);
                });

            migrationBuilder.AddColumn<string>(
                name: "Text",
                table: "Events",
                nullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "Xp",
                table: "Avatars",
                nullable: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Text",
                table: "Events");

            migrationBuilder.DropTable(
                name: "Progresses");

            migrationBuilder.AlterColumn<int>(
                name: "Xp",
                table: "Avatars",
                nullable: false);
        }
    }
}
