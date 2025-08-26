using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIB_TeleBirrMerchant.DAL.Entity
{
    [Table("telebirr_merchant_outgoing_transaction_simulation")]
    public class MerchantOutgoingTransactionSimulation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int Id { get; set; }
        [Column("account_debited")]
        public string accountDebited { get; set; }
        [Column("merchant_name")]
        public string MerchantName { get; set; }
        [Column("merchant_id")]
        public string Identifier { get; set; }

        [Column("customer_name")]
        public string CustomerName { get; set; }
        [Column("amount")]
        public decimal Amount { get; set; }

        [Column("status")]
        public string Status { get; set; }
        [Column("created_date")]
        public DateTime CreatedDate { get; set; }
        [Column("created_by")]
        public string CreatedBy { get; set; }
        [Column("customer_branch")]
        public string CustomerBranch { get; set; }
        [Column("branch")]
        public string Branch { get; set; }
        [Column("transaction_type")]
        public string TransactionType { get; set; }

        [Column("simulation")]
        public bool? Simulation { get; set; }

        [Column("simulation_message")]
        public string SimulationMessage { get; set; }

        
    }
}
