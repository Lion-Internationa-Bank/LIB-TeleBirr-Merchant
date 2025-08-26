using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIB_TeleBirrMerchant.DAL.Entity
{
    public class AccountBranch
    {
        [Column("BRANCH")]
        public string branch { get; set; }
        [Column("ACCOUNTNUMBER")]
        public string accountnumber { get; set; }
        [Column("FULLNAME")]
        public string fullname { get; set; }
    }
}
