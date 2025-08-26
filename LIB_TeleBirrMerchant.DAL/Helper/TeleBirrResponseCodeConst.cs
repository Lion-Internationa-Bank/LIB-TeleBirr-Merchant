using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LIB_TeleBirrMerchant.DAL.Helper
{
    public class TeleBirrResponseCodeConst
    {
        private static readonly Dictionary<string, string> Messages = new Dictionary<string, string>
    {
        { "0", "successfully." },
        { "1001", "The request is invalid." },
        { "1002", "The request parameter is missing." },
        { "1003", "Failed to authenticate the request parameter." },
        { "1004", "Failed to authenticate the duplicate request." },
        { "2001", "The request identity does not exist." },
        //{ "2002", "Failed to authenticate the identity in the request." },
        { "2002", "Inactive Account or Payment Failed." },
        { "2006", "Request processing timed out." },
        { "2007", "Failed to generate the verification code." },
        { "2008", "The link is in signed-out state and cannot process service requests." },
        { "3001", "Failed to initialize the service." },
        { "3002", "The identity status is abnormal." },
        { "3003", "Failed to parse the identity." },
        { "3004", "The identity does not exist." },
        { "3005", "Failed to authenticate security credentials." },
        { "3006", "Failed to create the identity." },
        { "3007", "The account status is abnormal, the account does not exist, or the account verification fails." },
        { "3008", "Failed to verify permissions." },
        { "3009", "The identity has not subscribed to the related product or service, or the identity repeatedly subscribes to products or services." },
        { "3010", "The product or service does not exist or is in incorrect state." },
        { "3011", "The historical service or associated service does not exist, or the historical service or associated service is abnormal." },
        { "3012", "A service is being processed." },
        { "3013", "Parameter parsing failed or parameter verification failed." },
        { "3015", "MSISDN verification failed." },
        { "3016", "Failed to verify the business rule." },
        { "3017", "Failed to verify the identity." },
        { "3022", "The workflow task status is abnormal or the workflow task is not enabled." },
        { "3029", "Failed to verify the file or file directory." },
        { "3043", "The target record cannot be found." },
        { "4001", "An exception occurs in service processing." },
        { "4002", "An exception occurs when the identity is modified." },
        { "4003", "The account balance is abnormal." },
        { "4004", "Limit verification failed." },
        { "4005", "Failed to send the outbound request or outbound message." },
        { "4006", "The third-party response times out, or fails, or returns an error message." },
        { "4008", "Failed to generate, import, export, save, or download the file." },
        { "4009", "The transaction participant or approver confirms to cancel the transaction." },
        { "4010", "The service processing times out." },
        { "4019", "Handle the pre-warning or prompt information." },
        { "5001", "An encryption or decryption exception occurs." },
        { "5002", "The background database has tampering risks." },
        { "6001", "The system is in the maintenance status." },
        { "6002", "The system is in the maximum load." },
        { "6004", "License verification failed." },
        { "6005", "System data processing exception." },
        { "7001", "The system configuration data is missing." },
        { "7002", "The system configuration data is invalid." },
        { "8001", "Communication between internal NEs is abnormal." },
        { "8002", "A single NE in the system is abnormal." },
        { "8003", "Failed to invoke the internal service." },
    };

        public static string GetMessage(string code)
        {
            return Messages.TryGetValue(code, out var message) ? message : "Unknown response code.";
        }
    }
}

