

using System;

namespace LIB_TeleBirrMerchant.DAL.DTO
{
    public class SearchParams : QueryParameters
    {
        public string AccountNo { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public string Branch { get; set; }
        public string Status { get; set; }
    }


}
