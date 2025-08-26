using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIB_TeleBirrMerchant.DAL.Entity
{
    [Table("telebirr_merchant_outgoing_transaction_request")]
    public class MerchantOutgoingTransaction
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
        [Column("approved_date")]
        public DateTime? ApprovedDate { get; set; }
        [Column("approved_by")]
        public string ApprovedBy { get; set; }
        [Column("customer_branch")]
        public string CustomerBranch { get; set; }
        [Column("branch")]
        public string Branch { get; set; }  
        [Column("branch_name")]
        public string BranchName { get; set; }
        [Column("transaction_type")]
        public string TransactionType { get; set; }
        [Column("cbs_transaction_id")]
        public string CbsTransactionId { get; set; }
        [Column("telebirr_transaction_id")]
        public string TelebirrTransactionId { get; set; }
        [Column("response_code")]
        public string ResponseCode { get; set; }
        [Column("response_message")]
        public string ResponseMessage { get; set; }

        [Column("simulation")]
        public bool? Simulation { get; set; }

        [Column("simulation_message")]
        public string SimulationMessage { get; set; }   
        
        [Column("tele_payment_request")]
        public string TelePaymentRequest { get; set; }    
        
        [Column("tele_payment_Confirm")]
        public string TelePaymentConfirm { get; set; }


        [NotMapped]
        public string OriginatorConversationID { get; set; }
        [NotMapped]
        public string Timestamp { get; set; }
        [NotMapped]
        public string TransactionID { get; set; }
        [NotMapped]
        public string ResultType { get; set; }
        [NotMapped]
        public string ResultCode { get; set; }
        [NotMapped]
        public string ConversationID { get; set; }

    }
}
