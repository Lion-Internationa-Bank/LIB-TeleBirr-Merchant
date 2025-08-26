using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LIB_TeleBirrMerchant.DAL.Entity;
using Microsoft.EntityFrameworkCore;

namespace LIB_TeleBirrMerchant.DAL.Contexts
{
    public class TeleBirrMerchantDbContext : DbContext
    {
        public TeleBirrMerchantDbContext(DbContextOptions<TeleBirrMerchantDbContext> options) : base(options)
        {
        }
        public DbSet<MerchantNameCheck> MerchantNameCheck { get; set; }
        public DbSet<MerchantOutgoingTransaction> MerchantOutgoingTransaction { get; set; }
        public DbSet<MerchantOutgoingTransactionSimulation> MerchantOutgoingTransactionSimulation { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // base.OnModelCreating(modelBuilder);
        }
    }
}
