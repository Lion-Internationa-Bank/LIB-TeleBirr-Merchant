using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LIB_TeleBirrMerchant.DAL.Entity;
using Microsoft.EntityFrameworkCore;

namespace LIB_TeleBirrMerchant.DAL.Contexts
{
    public class CBSDbContext:DbContext
    {
        public CBSDbContext(DbContextOptions<CBSDbContext> options) : base(options)
        {

        }

        public DbSet<ValidateTransaction> ValidateTransaction { get; set; }
        public DbSet<AccountBranch> AccountBranch { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
             base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<ValidateTransaction>().HasNoKey();
            modelBuilder.Entity<AccountBranch>().HasNoKey();
        }

    }
}
