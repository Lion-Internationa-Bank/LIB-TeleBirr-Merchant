using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using AutoMapper.Internal;
using Azure;
using LIB_TeleBirrMerchant.DAL;
using LIB_TeleBirrMerchant.DAL.Contexts;
using LIB_TeleBirrMerchant.DAL.DTO;
using LIB_TeleBirrMerchant.DAL.Entity;
using LIB_TeleBirrMerchant.DAL.Helper;
using LIB_TeleBirrMerchant.DAL.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace LIB_TeleBirrMerchant.Infra.Data.Repository
{
    public class MerchantNameCheckRepository : IMerchantNameCheckRepository
    {
        private TeleBirrMerchantDbContext _dbContext;
        private CBSDbContext _cbsdbContext;
        private IHttpContextAccessor _IHttpContextAccessor;
        public MerchantNameCheckRepository(TeleBirrMerchantDbContext dbContext,
            CBSDbContext cbsdbContext, IHttpContextAccessor IHttpContextAccessor)
        {
            _dbContext = dbContext;
            _cbsdbContext = cbsdbContext;
            _IHttpContextAccessor = IHttpContextAccessor;
        }

        public async Task<NameCheckResponseDTO> MerchantNameCheck(string Identifier)
        {
            string url = "http://10.1.10.90:7003/get-org-name";
            try
            {
                var _httpClient = new HttpClient();
                // var request = new HttpRequestMessage(HttpMethod.Post, url);
                var namecheck = new NameCheck()
                {
                    identifier = Identifier,
                    username = _IHttpContextAccessor.HttpContext.User.Identity.Name ?? "UnknownUser"
                };
                string namecheckData = JsonConvert.SerializeObject(namecheck);
                var content = new StringContent(namecheckData, Encoding.UTF8, "application/json");
                HttpResponseMessage response = await _httpClient.PostAsync(url, content);

                var contents = await response.Content.ReadAsStringAsync();

                NameCheckResponse nameCheckResponse = JsonConvert.DeserializeObject<NameCheckResponse>(contents);

                if (nameCheckResponse.organizationName != null)
                {
                    var ressponse = new NameCheckResponseDTO()
                    {
                        success = true,
                        message = "",
                        merchantName = nameCheckResponse.organizationName,
                    };
                    MerchantNameCheck merchantNameCheck = new MerchantNameCheck()
                    {
                        MerchantName = nameCheckResponse.organizationName,
                        ShortCode = Identifier,
                        ResultCode = "0",
                        ResultType = "0",
                        Remark = "",
                        CreatedDate = DateTime.Now,
                        ResultDesc = ""
                    };
                    await _dbContext.MerchantNameCheck.AddAsync(merchantNameCheck);
                    await _dbContext.SaveChangesAsync();

                    return ressponse;
                }
                else
                {
                    string message = TeleBirrResponseCodeConst.GetMessage(nameCheckResponse.resultCode);
                    MerchantNameCheck merchantNameCheck = new MerchantNameCheck()
                    {
                        MerchantName = nameCheckResponse.organizationName,
                        ShortCode = Identifier,
                        ResultCode = nameCheckResponse.resultCode,
                        ResultType = nameCheckResponse.resultType,
                        Remark = "",
                        CreatedDate = DateTime.Now,
                        ResultDesc = message
                    };
                    await _dbContext.MerchantNameCheck.AddAsync(merchantNameCheck);
                    await _dbContext.SaveChangesAsync();
                    var ressponse = new NameCheckResponseDTO()
                    {
                        success = false,
                        message = message,
                        merchantName = "",
                    };
                    return ressponse;
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                var ressponse = new NameCheckResponseDTO()
                {
                    success = false,
                    message = ex.Message,
                    merchantName = "",
                };

                return ressponse;
                throw ex;
            }
        }

        public async Task<AccountBranch> GetAccountBranch(string accountNo)
        {
            try
            {
                return await _cbsdbContext.AccountBranch.FromSqlRaw("select branch, accountnumber, fullname from anbesaprod.CUSTOMER_INFO_2 where accountnumber={0}", accountNo).FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }

    class NameCheck
    {
        public string identifier { get; set; }
        public string username { get; set; }
    }
    class NameCheckResponse
    {
        public string organizationName { get; set; }
        public string resultType { get; set; }
        public string error { get; set; }
        public string resultCode { get; set; }
    }
}
