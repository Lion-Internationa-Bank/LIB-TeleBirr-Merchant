using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using LIB_TeleBirrMerchant.Application.Services;
using LIB_TeleBirrMerchant.DAL.DTO;
using LIB_TeleBirrMerchant.DAL.Entity;
using LIB_TeleBirrMerchant.DAL.Interface;
using LIB_TeleBirrMerchant.DAL;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using LIB_TeleBirrMerchant.DAL.Contexts;
using System.Net.Http;
using System.Xml.Linq;
using System.Xml.Serialization;
using System.Net.Http.Json;
using Microsoft.EntityFrameworkCore;
using Google.Protobuf.WellKnownTypes;
using LIB_TeleBirrMerchant.DAL.Helper;
using System.Security.Cryptography.X509Certificates;

namespace LIB_TeleBirrMerchant.Infra.Data.Repository
{

    public class MerchantOutgoingTransactionRepository : IMerchantOutgoingTransactionRepository
    {
        private readonly TeleBirrMerchantDbContext _context;
        private readonly CBSDbContext _cbsContext;
        private readonly IMapper _mapper;
        private readonly HttpClient _httpClient;
        private readonly IHttpContextAccessor _httpContext;
        public MerchantOutgoingTransactionRepository(TeleBirrMerchantDbContext context,
            IMapper mapper, HttpClient httpClient, CBSDbContext cbsContext,
            IHttpContextAccessor httpContext)
        {
            _context = context;
            _mapper = mapper;
            _httpClient = httpClient;
            _cbsContext = cbsContext;
            _httpContext = httpContext;
        }

        public async Task<ValidateTransaction> ValidateTransaction(string transactionId)
        {
            try
            {
                var validateTrans = await _cbsContext.ValidateTransaction.FromSqlRaw($"select EVENT, AMOUNT, ACCOUNT, REFNO from anbesaprod.valid_event where refno='{transactionId}'", transactionId).FirstOrDefaultAsync();
                return validateTrans;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }

        }

        public async Task<ResponseDTO> SimulateLIBTransfer(MerchantOutgoingTransactionSimulation merchantOutgoingTransaction)
        {



            string url = "http://10.1.10.90:7003/paymentSimulation";
            try
            {

                var _httpClient = new HttpClient();

                var objSimulation = new SimulationDto()
                {
                    accountDebited = merchantOutgoingTransaction.accountDebited,
                    amount = merchantOutgoingTransaction.Amount,
                };
                string simulationData = JsonConvert.SerializeObject(objSimulation);
                var content = new StringContent(simulationData, Encoding.UTF8, "application/json");
                HttpResponseMessage response = await _httpClient.PostAsync(url, content);

                var contents = await response.Content.ReadAsStringAsync();

                SimulationResponse requestResponse = JsonConvert.DeserializeObject<SimulationResponse>(contents);


                merchantOutgoingTransaction.Status = "simulation";
                merchantOutgoingTransaction.CreatedBy = _httpContext.HttpContext.User.Identity.Name;
                merchantOutgoingTransaction.CreatedDate = DateTime.Now;
                merchantOutgoingTransaction.Simulation = true;

                merchantOutgoingTransaction.SimulationMessage = requestResponse.message.ToString();
                await _context.MerchantOutgoingTransactionSimulation.AddAsync(merchantOutgoingTransaction);
                await _context.SaveChangesAsync();

                if (requestResponse.status == "valid")
                {

                    return new ResponseDTO()
                    {
                        success = true,
                        message = (string)requestResponse.message,
                    };


                }
                else if (requestResponse.status == "error")
                {
                    return new ResponseDTO()
                    {
                        success = false,
                        message = (string)requestResponse.message
                    };
                }
                else if (requestResponse.status == "invalid")
                {
                    return new ResponseDTO()
                    {
                        success = false,
                        message = requestResponse.message.ToString()
                    };
                }
                else
                {
                    return new ResponseDTO()
                    {
                        success = false,
                        message = "Unknown error occurred"
                    };

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                throw ex;
            }
        }

        public async Task CreateMerchantTransfere(MerchantOutgoingTransaction merchantOutgoingTransaction)
        {
            try
            {
                merchantOutgoingTransaction.Status = "Pending";
                merchantOutgoingTransaction.CreatedBy = _httpContext.HttpContext.User.Identity.Name;
                merchantOutgoingTransaction.CreatedDate = DateTime.Now;
                await _context.MerchantOutgoingTransaction.AddAsync(merchantOutgoingTransaction);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                throw ex;
            }
        }

        public async Task<List<MerchantOutgoingTransaction>> GetPendingMerchantTransactionList(SearchParams param)
        {
            try
            {
                //param.DateFrom = param.DateFrom.ToUniversalTime();
                //param.DateTo = new DateTime(param.DateTo.Year, param.DateTo.Month, param.DateTo.Day, 23, 59, 59).ToUniversalTime();
                param.DateFrom = param.DateFrom;
                param.DateTo = new DateTime(param.DateTo.Year, param.DateTo.Month, param.DateTo.Day, 23, 59, 59);
                var PendingTransaction = await _context.MerchantOutgoingTransaction.Where(p => p.CreatedDate >= param.DateFrom
                && p.CreatedDate <= param.DateTo && p.Status == "Pending" && p.Branch == param.Branch &&
                (p.accountDebited == param.AccountNo || param.AccountNo == null)).ToListAsync();
                return PendingTransaction;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                throw ex;
            }
        }

        public async Task<List<MerchantOutgoingTransaction>> GetApprovedMerchantTransactionList(SearchParams param)
        {
            try
            {
                //param.DateFrom = param.DateFrom.ToUniversalTime();
                //param.DateTo = new DateTime(param.DateTo.Year, param.DateTo.Month, param.DateTo.Day, 23, 59, 59).ToUniversalTime();
                param.DateFrom = param.DateFrom;
                param.DateTo = new DateTime(param.DateTo.Year, param.DateTo.Month, param.DateTo.Day, 23, 59, 59);
                var PendingTransaction = await _context.MerchantOutgoingTransaction.Where(p => p.CreatedDate >= param.DateFrom
                && p.CreatedDate <= param.DateTo && p.Status != "Pending" && p.Branch == param.Branch &&
                (p.accountDebited == param.AccountNo || param.AccountNo == null)).ToListAsync();
                return PendingTransaction;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                throw ex;
            }
        }

        private string GeneratePattern1(string prefix, int length)
        {

            // Numeric part (two digits)
            Random random = new Random();
            int numericPart = random.Next(0, 100); // Generates a number between 0 and 99
                                                   // string numericString = numericPart.ToString("D2"); // Formats as two digits

            // Hexadecimal part (32 characters)
            StringBuilder hexPart = new StringBuilder(length);
            for (int i = 0; i < length; i++)
            {
                hexPart.Append(random.Next(0, 16).ToString("X")); // Generates a random hex character
            }

            //// Suffix (two letters)
            //string suffix = "eh"; // Fixed suffix

            // Combine all parts
            return $"{prefix}{hexPart}";
        }

        private string GeneratePattern(string prefix, int length)
        {
            Random random = new Random();

            // Generate the numeric part as a random integer with the specified length
            int numericPart = random.Next((int)Math.Pow(10, length - 1), (int)Math.Pow(10, length));

            // Return the combined prefix and numeric part
            return $"{prefix}{numericPart}";
        }

        public static string GenerateConversationID(int length = 15)
        {
            Random random = new Random();
            string id = "";

            for (int i = 0; i < length; i++)
            {
                id += random.Next(0, 10).ToString(); // Append a random digit (0–9)
            }

            return id;
        }

        public async Task RejectMerchantTransfere(int Id)
        {
            try
            {
                var transaction = _context.MerchantOutgoingTransaction.SingleOrDefault(p => p.Id == Id && p.Status == "Pending");
                if (transaction == null)
                {
                    throw new KeyNotFoundException("The requested record does not found");
                }
                transaction.Status = "Reject";
                transaction.ApprovedBy = _httpContext.HttpContext.User.Identity.Name;
                transaction.ApprovedDate = DateTime.Now;
                _context.MerchantOutgoingTransaction.Update(transaction);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ResponseDTO> ApproveMerchantTransfere(int Id)
        {
            try
            {
                var transaction = _context.MerchantOutgoingTransaction.SingleOrDefault(p => p.Id == Id && p.Status == "Pending");
                if (transaction == null)
                {
                    return new ResponseDTO()
                    {
                        success = false,
                        message = "The requested record for approval does not found"
                    };
                }
                string ConversationId = "telm" + GenerateConversationID(15) + transaction.Identifier;

               

                //string libTransactionId = GeneratePattern("f", 10);
                try
                {
                    var cbsResult = await TransferRequest(transaction, ConversationId);
                    if (cbsResult.status == "0")
                    {
                        transaction.Status = "Fail";
                        transaction.ApprovedBy = _httpContext.HttpContext.User.Identity.Name;
                        transaction.ApprovedDate = DateTime.Now;
                        transaction.CbsTransactionId = cbsResult.transactionID;
                        transaction.ResponseCode = cbsResult.status;
                        transaction.ResponseMessage = cbsResult.message;
                        _context.MerchantOutgoingTransaction.Update(transaction);
                        await _context.SaveChangesAsync();
                        return new ResponseDTO()
                        {
                            success = false,
                            message = cbsResult.message
                        };
                    }
                    var valdateTrans = await ValidateTransaction(ConversationId);
                    if (valdateTrans == null)
                    {
                        transaction.ResponseMessage = "cbs transacion not succesfull";
                        transaction.Status = "Fail";
                        transaction.ApprovedBy = _httpContext.HttpContext.User.Identity.Name;
                        transaction.ApprovedDate = DateTime.Now;
                        _context.MerchantOutgoingTransaction.Update(transaction);
                        await _context.SaveChangesAsync();
                        return new ResponseDTO()
                        {
                            success = false,
                            message = "The CBS transaction is not successful",
                        };
                    }
                    else if (valdateTrans.REFNO.Trim() == ConversationId.Trim())
                    {
                        transaction.CbsTransactionId = cbsResult.transactionID;
                        transaction.ResponseCode = cbsResult.status;
                        transaction.Status = "Approved";
                        transaction.ResponseMessage = cbsResult.message;
                        transaction.TelebirrTransactionId = cbsResult.teleReceiptNumber;
                        _context.MerchantOutgoingTransaction.Update(transaction);
                        await _context.SaveChangesAsync();
                    }
                  
                }
                catch
                {
                    var valdateTrans = await ValidateTransaction(ConversationId);
                    if (valdateTrans != null && valdateTrans.REFNO == ConversationId)
                    {
                        transaction.CbsTransactionId = ConversationId;
                        transaction.ResponseCode = "1";
                        transaction.ResponseMessage = "success";
                        transaction.Status = "Approved";
                        //transaction.TelebirrTransactionId = paymentIntiat.TransactionID;
                        _context.MerchantOutgoingTransaction.Update(transaction);
                        await _context.SaveChangesAsync();
                    }
                    else
                    {
                        return new ResponseDTO()
                        {
                            success = false,
                            message = "The transaction is not successful. Please try again",
                        };
                    }
                }
                return new ResponseDTO()
                {
                    success = true,
                    message = "The transaction is successful",


                };






            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                throw ex;
            }
        }

        //public async Task<ResponseDTO> ApproveMerchantTransfereWithPaymentConfirmation(int Id)
        //{
        //    try
        //    {
        //        var transaction = _context.MerchantOutgoingTransaction.SingleOrDefault(p => p.Id == Id && p.Status == "Pending");
        //        if (transaction == null)
        //        {
        //            return new ResponseDTO()
        //            {
        //                success = false,
        //                message = "The requested record for approval does not found"
        //            };
        //        }
        //        string ConversationId = "telm" + GenerateConversationID(15) + transaction.Identifier;
        //        var paymentIntiat = await IntiatePaymentRequest(transaction, ConversationId);
        //        if (paymentIntiat != null && paymentIntiat.Success == "true" && paymentIntiat.ResultCode == "0" && paymentIntiat.ResultType == "0" && paymentIntiat.ResultDesc == "Process service request successfully.")
        //        {
        //            var paymentConfirm = await PaymentConfirm(paymentIntiat.OriginatorConversationID, paymentIntiat.TransactionID);
        //            if (paymentConfirm.Success == "true" && paymentConfirm.ResultCode == "0" && paymentConfirm.ResultType == "0" && paymentConfirm.ResultDesc == "Process service request successfully.")
        //            {
        //                // transaction.Status = "Approved";
        //                transaction.Status = "PaymentConfirmed";
        //                //transaction.ApprovedBy = _httpContext.HttpContext.User.Identity.Name;
        //                //transaction.ApprovedDate = DateTime.Now;

        //                transaction.ResponseCode = paymentConfirm.ResultDesc;
        //                transaction.ResponseMessage = paymentConfirm.ResultDesc;
        //                transaction.TelebirrTransactionId = paymentConfirm.TransactionID;
        //                _context.MerchantOutgoingTransaction.Update(transaction);
        //                await _context.SaveChangesAsync();

        //                //string libTransactionId = GeneratePattern("f", 10);
        //                try
        //                {
        //                    var cbsResult = await TransferRequestConfirmRequest(transaction, paymentConfirm);
        //                    if (cbsResult.status == "0")
        //                    {
        //                        transaction.Status = "Fail";
        //                        transaction.ApprovedBy = _httpContext.HttpContext.User.Identity.Name;
        //                        transaction.ApprovedDate = DateTime.Now;
        //                        transaction.CbsTransactionId = cbsResult.transactionID;
        //                        transaction.ResponseCode = cbsResult.status;
        //                        transaction.ResponseMessage = cbsResult.message;
        //                        _context.MerchantOutgoingTransaction.Update(transaction);
        //                        await _context.SaveChangesAsync();
        //                        return new ResponseDTO()
        //                        {
        //                            success = false,
        //                            message = cbsResult.message
        //                        };
        //                    }
        //                    var valdateTrans = await ValidateTransaction(ConversationId);
        //                    if (valdateTrans == null)
        //                    {
        //                        transaction.ResponseMessage = "cbs transacion not succesfull";
        //                        transaction.Status = "Fail";
        //                        transaction.ApprovedBy = _httpContext.HttpContext.User.Identity.Name;
        //                        transaction.ApprovedDate = DateTime.Now;
        //                        _context.MerchantOutgoingTransaction.Update(transaction);
        //                        await _context.SaveChangesAsync();
        //                        return new ResponseDTO()
        //                        {
        //                            success = false,
        //                            message = "The CBS transaction is not successful",
        //                        };
        //                    }
        //                    transaction.CbsTransactionId = cbsResult.transactionID;
        //                    transaction.ResponseCode = cbsResult.status;
        //                    transaction.ResponseMessage = cbsResult.message;
        //                    transaction.TelebirrTransactionId = cbsResult.teleReceiptNumber;
        //                    _context.MerchantOutgoingTransaction.Update(transaction);
        //                    await _context.SaveChangesAsync();
        //                }
        //                catch
        //                {
        //                    var valdateTrans = await ValidateTransaction(ConversationId);
        //                    if (valdateTrans != null && valdateTrans.REFNO == ConversationId)
        //                    {
        //                        transaction.CbsTransactionId = ConversationId;
        //                        transaction.ResponseCode = "1";
        //                        transaction.ResponseMessage = "success";
        //                        transaction.TelebirrTransactionId = paymentIntiat.TransactionID;
        //                        _context.MerchantOutgoingTransaction.Update(transaction);
        //                        await _context.SaveChangesAsync();
        //                    }
        //                    else
        //                    {
        //                        return new ResponseDTO()
        //                        {
        //                            success = false,
        //                            message = "The transaction is not successful. Please try again",
        //                        };
        //                    }
        //                }
        //                return new ResponseDTO()
        //                {
        //                    success = true,
        //                    message = "The transaction is successful",


        //                };
        //            }
        //            else
        //            {
        //                transaction.Status = "paymentConfirmation";
        //                transaction.TelePaymentConfirm = paymentConfirm.ResultDesc;
        //                _context.MerchantOutgoingTransaction.Update(transaction);
        //                await _context.SaveChangesAsync();
        //                return new ResponseDTO()
        //                {
        //                    success = false,
        //                    message = paymentConfirm.ResultDesc
        //                };
        //            }
        //        }
        //        else
        //        {
        //            transaction.Status = "paymentIntiation";
        //            transaction.TelePaymentConfirm = paymentIntiat.ResultDesc;
        //            _context.MerchantOutgoingTransaction.Update(transaction);
        //            await _context.SaveChangesAsync();
        //            return new ResponseDTO()
        //            {
        //                success = false,
        //                message = paymentIntiat.ResultDesc
        //            };
        //        }


        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine($"Error: {ex.Message}");
        //        throw ex;
        //    }
        //}
        public async Task<TransfereRequestResponse> TransferRequest(MerchantOutgoingTransaction transaction, string ConversationId)
        {
            string url = "http://10.1.10.90:7003/transferRequest";
            try
            {
                var _httpClient = new HttpClient();
                // var request = new HttpRequestMessage(HttpMethod.Post, url);
                var namecheck = new TransfereRequest()
                {
                    identifier = transaction.Identifier,
                    amount = transaction.Amount,
                    account = transaction.accountDebited,
                    branch = transaction.CustomerBranch,
                    username = _httpContext.HttpContext.User.Identity.Name,
                    branchofficecode = transaction.Branch,
                    OriginatorConversationID = ConversationId,
                   
                };
                string namecheckData = JsonConvert.SerializeObject(namecheck);
                var content = new StringContent(namecheckData, Encoding.UTF8, "application/json");
                HttpResponseMessage response = await _httpClient.PostAsync(url, content);

                var contents = await response.Content.ReadAsStringAsync();

                TransfereRequestResponse requestResponse = JsonConvert.DeserializeObject<TransfereRequestResponse>(contents);
                return requestResponse;

            }
            catch (Exception ex)
            {
                return new TransfereRequestResponse()
                {
                    status = "0",
                    message = ex.Message,
                };
            }
        }

       

        //public async Task<TransfereRequestResponse> TransferRequestConfirmRequest(MerchantOutgoingTransaction transaction, PaymentConfirmResponse paymentConfirm)
        //{
        //    string url = "http://10.1.10.90:7003/transferRequest";
        //    try
        //    {
        //        var _httpClient = new HttpClient();
        //        // var request = new HttpRequestMessage(HttpMethod.Post, url);
        //        var namecheck = new TransfereRequest()
        //        {
        //            identifier = transaction.Identifier,
        //            amount = transaction.Amount,
        //            account = transaction.accountDebited,
        //            branch = transaction.CustomerBranch,
        //            username = _httpContext.HttpContext.User.Identity.Name,
        //            branchofficecode = transaction.Branch,
        //            ConversationID = paymentConfirm.ConversationID,
        //            OriginatorConversationID = paymentConfirm.OriginatorConversationID,
        //            resultCode = paymentConfirm.ResultCode,
        //            resultdesc = paymentConfirm.ResultDesc,
        //            resultType = paymentConfirm.ResultType,
        //            ReceiptNumber = paymentConfirm.TransactionID
        //        };
        //        string namecheckData = JsonConvert.SerializeObject(namecheck);
        //        var content = new StringContent(namecheckData, Encoding.UTF8, "application/json");
        //        HttpResponseMessage response = await _httpClient.PostAsync(url, content);

        //        var contents = await response.Content.ReadAsStringAsync();

        //        TransfereRequestResponse requestResponse = JsonConvert.DeserializeObject<TransfereRequestResponse>(contents);
        //        return requestResponse;

        //    }
        //    catch (Exception ex)
        //    {
        //        return new TransfereRequestResponse()
        //        {
        //            status = "0",
        //            message = ex.Message,
        //        };
        //    }
        //}

        //public async Task<PaymentIntiatResponse> IntiatePaymentRequest(MerchantOutgoingTransaction transaction, string conversationId)
        //{
        //    string url = "http://10.1.10.90:7003/intiatePaymentRequest";
        //    try
        //    {
        //        var _httpClient = new HttpClient();
        //        // var request = new HttpRequestMessage(HttpMethod.Post, url);
        //        var intiate = new PaymentRequestInitiateDTO()
        //        {
        //            identifier = transaction.Identifier,
        //            amount = transaction.Amount,
        //            OriginatorConversationID = conversationId
        //        };
        //        string intiatPaymentData = JsonConvert.SerializeObject(intiate);
        //        var content = new StringContent(intiatPaymentData, Encoding.UTF8, "application/json");
        //        HttpResponseMessage response = await _httpClient.PostAsync(url, content);

        //        var contents = await response.Content.ReadAsStringAsync();

        //        PaymentIntiatResponse requestResponse = JsonConvert.DeserializeObject<PaymentIntiatResponse>(contents);
        //        return requestResponse;

        //    }
        //    catch (Exception ex)
        //    {
        //        return null;
        //    }
        //}

        //    public async Task<PaymentConfirmResponse> PaymentConfirm(string conversationID, string receiptNumber)
        //    {
        //        string url = "http://10.1.10.90:7003/paymentConfirm";
        //        try
        //        {
        //            var _httpClient = new HttpClient();
        //            // var request = new HttpRequestMessage(HttpMethod.Post, url);
        //            var confirmPayment = new PaymentConfirmDTO()
        //            {
        //                OriginatorConversationID = conversationID,
        //                ReceiptNumber = receiptNumber
        //            };
        //            string confirmPaymentData = JsonConvert.SerializeObject(confirmPayment);
        //            var content = new StringContent(confirmPaymentData, Encoding.UTF8, "application/json");
        //            HttpResponseMessage response = await _httpClient.PostAsync(url, content);

        //            var contents = await response.Content.ReadAsStringAsync();

        //            PaymentConfirmResponse requestResponse = JsonConvert.DeserializeObject<PaymentConfirmResponse>(contents);
        //            return requestResponse;

        //        }
        //        catch (Exception ex)
        //        {
        //            return new PaymentConfirmResponse()
        //            {
        //                //status = "0",
        //                //message = ex.Message,
        //            };
        //        }
        //    }

    }

    public class TransfereRequest
    {
        public string identifier { get; set; }
        public decimal amount { get; set; }
        public string username { get; set; }
        public string account { get; set; }
        public string branch { get; set; }
        public string branchofficecode { get; set; }
        public string OriginatorConversationID { get; set; }
        public string resultType { get; set; }
        public string resultCode { get; set; }
        public string resultdesc { get; set; }
        public string ConversationID { get; set; }
        public string ReceiptNumber { get; set; }
    }

    public class PaymentRequestInitiateDTO
    {
        public string identifier { get; set; }
        public decimal amount { get; set; }
        public string OriginatorConversationID { get; set; }

    }

    public class PaymentConfirmDTO
    {
        public string ReceiptNumber { get; set; }
        public string OriginatorConversationID { get; set; }

    }

    public class PaymentConfirmResponse
    {
        public string Success { get; set; }
        public string OriginatorConversationID { get; set; }
        public string ConversationID { get; set; }
        public string ResultType { get; set; }
        public string ResultCode { get; set; }
        public string ResultDesc { get; set; }
        public string TransactionID { get; set; }
        public string TransactionStatus { get; set; }
        public string IsReversed { get; set; }
        public string CompletedTime { get; set; }
    }

    public class PaymentIntiatResponse
    {
        public string Success { get; set; }
        public string OriginatorConversationID { get; set; }
        public string ConversationID { get; set; }
        public string ResultType { get; set; }
        public string ResultCode { get; set; }
        public string ResultDesc { get; set; }
        public string TransactionID { get; set; }
    }

    public class TransfereRequestResponse
    {
        public string status { get; set; }
        public string message { get; set; }
        public string transactionID { get; set; }
        public string teleResultType { get; set; }
        public string teleResultCode { get; set; }
        public string teleReceiptNumber { get; set; }
    }


    public class SimulationDto
    {
        public string accountDebited { get; set; }
        public decimal amount { get; set; }
    }

    public class SimulationResponse
    {
        public string status { get; set; }
        //public List<string> message { get; set; }
        public object message { get; set; }
    }
}

