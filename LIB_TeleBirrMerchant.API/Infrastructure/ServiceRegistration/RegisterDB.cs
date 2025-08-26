using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using LIB_TeleBirrMerchant.DAL;
using LIB_TeleBirrMerchant.DAL.Contexts;


namespace LIB_TeleBirrMerchant.UI.Infrastructure
{
    internal class RegisterDB : IServiceRegistration
    {
        public void RegisterAppServices(IServiceCollection services, IConfiguration config)
        {


            services.AddDbContext<TeleBirrMerchantDbContext>(options =>
              options.UseNpgsql(config["ConnectionStrings:DefaultConnection"], b => b.MigrationsAssembly("LIB_TeleBirrMerchant.DAL"))); 
            
            services.AddDbContext<CBSDbContext>(options =>
              options.UseOracle(config["ConnectionStrings:CoreConnection"], b => b.MigrationsAssembly("LIB_TeleBirrMerchant.API")));


        }
    }
}
