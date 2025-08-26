using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LIB_TeleBirrMerchant.DAL.DTO;
using LIB_TeleBirrMerchant.DAL.Entity;

namespace LIB_TeleBirrMerchant.Application.Interfaces
{
    public interface IMerchantNameCheckService
    {
        Task<NameCheckResponseDTO> MerchantNameCheck(string Identifier);

        Task<AccountBranch> GetAccountBranch(string accountNo);
    }
}
