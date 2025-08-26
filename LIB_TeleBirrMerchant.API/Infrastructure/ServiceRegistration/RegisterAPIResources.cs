using LIB_TeleBirrMerchant.Application.Interfaces;
using LIB_TeleBirrMerchant.Application.Services;
using LIB_TeleBirrMerchant.DAL.Interface;
using LIB_TeleBirrMerchant.Infra.Data.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


namespace LIB_TeleBirrMerchant.UI.Infrastructure
{
    internal class RegisterAPIResources : IServiceRegistration
    {
        public void RegisterAppServices(IServiceCollection services, IConfiguration config)
        {
            //services.AddTransient<IDatabaseInitializer, DatabaseInitializer>();
            services.AddHttpClient();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddScoped<IMerchantNameCheckService, MerchantNameCheckService>();
            services.AddScoped<IMerchantNameCheckRepository, MerchantNameCheckRepository>(); 
            
            services.AddScoped<IMerchantOutgoingTransactionService, MerchantOutgoingTransactionService>();
            services.AddScoped<IMerchantOutgoingTransactionRepository, MerchantOutgoingTransactionRepository>();


        }
    }
}
