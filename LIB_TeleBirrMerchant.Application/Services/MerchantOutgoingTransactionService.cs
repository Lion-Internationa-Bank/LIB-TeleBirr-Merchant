using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LIB_TeleBirrMerchant.Application.Interfaces;
using LIB_TeleBirrMerchant.DAL.DTO;
using LIB_TeleBirrMerchant.DAL.Entity;
using LIB_TeleBirrMerchant.DAL.Interface;
using Mysqlx.Expr;

namespace LIB_TeleBirrMerchant.Application.Services
{
    public class MerchantOutgoingTransactionService : IMerchantOutgoingTransactionService
    {
        private readonly IMerchantOutgoingTransactionRepository _merchantOutgoingTransactionRepository;
        public MerchantOutgoingTransactionService(IMerchantOutgoingTransactionRepository merchantOutgoingTransactionRepository) {
            _merchantOutgoingTransactionRepository = merchantOutgoingTransactionRepository;
        }

        public Task<ResponseDTO> ApproveMerchantTransfere(int Id)
        {
            return _merchantOutgoingTransactionRepository.ApproveMerchantTransfere(Id);
        }

        public Task CreateMerchantTransfere(MerchantOutgoingTransaction merchantOutgoingTransaction)
        {
            return _merchantOutgoingTransactionRepository.CreateMerchantTransfere(merchantOutgoingTransaction);
        }

        public Task<List<MerchantOutgoingTransaction>> GetApprovedMerchantTransactionList(SearchParams param)
        {
            return _merchantOutgoingTransactionRepository.GetApprovedMerchantTransactionList(param);
        }

        public Task<List<MerchantOutgoingTransaction>> GetPendingMerchantTransactionList(SearchParams param)
        {
            return _merchantOutgoingTransactionRepository.GetPendingMerchantTransactionList(param);
        }

        //public Task<ResponseDTO> MerchantOutgoingTransaction(OutgoingTransfereDTO outgoingTransferedto)
        //{
        //   return _merchantOutgoingTransactionRepository.MerchantOutgoingTransaction(outgoingTransferedto);
        //}

        //public async Task OutgoingTransfereCallBackResponse(string xmlContent)
        //{
        //     await _merchantOutgoingTransactionRepository.OutgoingTransfereCallBackResponse(xmlContent);
        //}

        public async Task RejectMerchantTransfere(int Id)
        {
            await _merchantOutgoingTransactionRepository.RejectMerchantTransfere(Id);
        }

        public async Task<ResponseDTO> SimulateLIBTransfer(MerchantOutgoingTransactionSimulation merchantOutgoingTransaction)
        {
            return await _merchantOutgoingTransactionRepository.SimulateLIBTransfer(merchantOutgoingTransaction);
        }
    }
}
