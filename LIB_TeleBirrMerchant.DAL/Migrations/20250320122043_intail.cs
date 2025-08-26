using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace LIB_TeleBirrMerchant.DAL.Migrations
{
    /// <inheritdoc />
    public partial class intail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MerchantNameCheck",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Identifier = table.Column<string>(type: "text", nullable: true),
                    Remark = table.Column<string>(type: "text", nullable: true),
                    ResultType = table.Column<string>(type: "text", nullable: true),
                    ResultCode = table.Column<string>(type: "text", nullable: true),
                    ResultDesc = table.Column<string>(type: "text", nullable: true),
                    IdentityStatus = table.Column<string>(type: "text", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MerchantNameCheck", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MerchantOutgoingTransaction",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    accountDebited = table.Column<string>(type: "text", nullable: true),
                    MerchantName = table.Column<string>(type: "text", nullable: true),
                    Identifier = table.Column<string>(type: "text", nullable: true),
                    Amount = table.Column<decimal>(type: "numeric", nullable: false),
                    OriginatorConversationID = table.Column<string>(type: "text", nullable: true),
                    Timestamp = table.Column<string>(type: "text", nullable: true),
                    TransactionID = table.Column<string>(type: "text", nullable: true),
                    ResultType = table.Column<string>(type: "text", nullable: true),
                    ResultCode = table.Column<string>(type: "text", nullable: true),
                    ConversationID = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<string>(type: "text", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: true),
                    ApprovedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ApprovedBy = table.Column<string>(type: "text", nullable: true),
                    CustomerBranch = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MerchantOutgoingTransaction", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MerchantNameCheck");

            migrationBuilder.DropTable(
                name: "MerchantOutgoingTransaction");
        }
    }
}
