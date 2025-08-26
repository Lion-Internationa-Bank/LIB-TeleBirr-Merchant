using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIB_TeleBirrMerchant.DAL.DTO
{
    public class NameCheckResponseDTO
    {
        public bool success { get; set; }
        public string message { get; set; }
        public string merchantName { get; set; }
    }
}
