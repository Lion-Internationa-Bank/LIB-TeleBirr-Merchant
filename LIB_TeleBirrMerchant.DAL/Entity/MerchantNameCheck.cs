using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIB_TeleBirrMerchant.DAL.Entity
{
    [Table("merchant_name_check")]
    public class MerchantNameCheck
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string MerchantName { get; set; }
        public string ShortCode { get; set; }
        public string Remark { get; set; }
        public string ResultType { get; set; }
        public string ResultCode { get; set; }
        public string ResultDesc { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
