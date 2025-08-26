using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIB_TeleBirrMerchant.DAL.Entity
{
    public class ValidateTransaction
    {
        public string EVENT {  get; set; }
        public string ACCOUNT {  get; set; }
        public string REFNO {  get; set; }
        public decimal AMOUNT {  get; set; }
        
    }
}
