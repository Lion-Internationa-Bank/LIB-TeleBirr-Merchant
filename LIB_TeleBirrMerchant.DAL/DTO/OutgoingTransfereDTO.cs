using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIB_TeleBirrMerchant.DAL.DTO
{
    public class OutgoingTransfereDTO
    {
        public string AccountDebited { get; set; }
        public string Identifier { get; set; }
        public string MerchantName { get; set; }
        public string CustomerBranch { get; set; }
        public decimal Amount { get; set; }
        public string TransactionType { get; set; }
        public string CustomerName { get; set; }
        public string ApprovedBy { get; set; }
        public string Branch { get; set; }
        public string BranchName { get; set; }
    }
}
