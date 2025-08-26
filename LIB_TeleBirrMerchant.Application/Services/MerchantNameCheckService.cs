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
    public class MerchantNameCheckService : IMerchantNameCheckService
    {
        private readonly IMerchantNameCheckRepository _merchantNameCheckRepository;
        public MerchantNameCheckService(IMerchantNameCheckRepository merchantNameCheckRepository)
        {
            _merchantNameCheckRepository = merchantNameCheckRepository;
        }

        public async Task<AccountBranch> GetAccountBranch(string accountNo)
        {
            return await _merchantNameCheckRepository.GetAccountBranch(accountNo);
        }

        public async Task<NameCheckResponseDTO> MerchantNameCheck(string Identifier)
        {
            return await _merchantNameCheckRepository.MerchantNameCheck(Identifier);
        }
    }
}
