using AutoMapper;
using LIB_TeleBirrMerchant.DAL.DTO;
using LIB_TeleBirrMerchant.DAL.Entity;


namespace LIB_TeleBirrMerchant.UI.Infrastructure
{
    public class AppMapping : Profile
    {
        public AppMapping()
        {
            CreateMap<MerchantOutgoingTransaction, OutgoingTransfereDTO>().ReverseMap();
            CreateMap<MerchantOutgoingTransactionSimulation, OutgoingTransfereDTO>().ReverseMap();
           
        }
       
    }
}
 