using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LIB_TeleBirrMerchant.DAL.DTO;
using LIB_TeleBirrMerchant.DAL.Entity;

namespace LIB_TeleBirrMerchant.Application.Interfaces
{
    public interface IMerchantOutgoingTransactionService
    {
        Task CreateMerchantTransfere(MerchantOutgoingTransaction merchantOutgoingTransaction);
        Task<ResponseDTO> SimulateLIBTransfer(MerchantOutgoingTransactionSimulation merchantOutgoingTransaction);
        Task<ResponseDTO> ApproveMerchantTransfere(int Id);
        Task<List<MerchantOutgoingTransaction>> GetPendingMerchantTransactionList(SearchParams param);
        Task<List<MerchantOutgoingTransaction>> GetApprovedMerchantTransactionList(SearchParams param);
        Task RejectMerchantTransfere(int Id);
    }
}

