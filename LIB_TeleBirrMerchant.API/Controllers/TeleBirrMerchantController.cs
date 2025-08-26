using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LIB_TeleBirrMerchant.Application.Services;
using LIB_TeleBirrMerchant.Application.Interfaces;
using LIB_TeleBirrMerchant.DAL.DTO;
using System.IO;
using System.Text;
using System.Xml.Linq;
using System.Xml.Serialization;
using LIB_TeleBirrMerchant.DAL.Entity;
using AutoMapper;
using System;
using System.Net.Http;
using System.Net;
using Microsoft.AspNetCore.Authorization;

namespace LIB_TeleBirrMerchant.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TeleBirrMerchantController : ControllerBase
    {
        private readonly IMerchantNameCheckService _merchantNameCheckService;
        private readonly IMerchantOutgoingTransactionService _merchantOutgoingTransactionService;
        private readonly IMapper _mapper;

        public TeleBirrMerchantController(IMerchantNameCheckService merchantNameCheckService,
            IMerchantOutgoingTransactionService merchantOutgoingTransactionService,
             IMapper mapper)
        {
            _merchantNameCheckService = merchantNameCheckService;
            _merchantOutgoingTransactionService = merchantOutgoingTransactionService;
            _mapper = mapper;
        }

        [HttpGet("MerchantNameCheck/{Identifier}")]
        public async Task<IActionResult> MerchantNameCheck(string Identifier)
        {
            var result = await _merchantNameCheckService.MerchantNameCheck(Identifier);
            return Ok(result);
        }
        
        //[HttpPost("OutgoingTransfere")]
        //public async Task<IActionResult> OutgoingTransfere([FromBody] OutgoingTransfereDTO outgoingTransfereDTO)
        //{
        //    var result = await _merchantOutgoingTransactionService.MerchantOutgoingTransaction(outgoingTransfereDTO);
        //    return Ok(result);
        //}

        //[HttpPost("CallBackResponse")]
        ////[Consumes("application/xml")]
        ////[Produces("application/xml")]
        //public async Task<IActionResult> CallBackResponse()
        //{
        //    using (var reader = new StreamReader(Request.Body, Encoding.UTF8))
        //    {
        //        var xmlContent = reader.ReadToEnd();
        //        await _merchantOutgoingTransactionService.OutgoingTransfereCallBackResponse(xmlContent);
        //    }
        //    return Ok();
        //}

        [HttpPost("CreateMerchantTransfere")]
        public async Task<IActionResult> CreateMerchantTransfere([FromBody] OutgoingTransfereDTO merchantOutgoingTransactiondto)
        {
            await _merchantOutgoingTransactionService.CreateMerchantTransfere(_mapper.Map<MerchantOutgoingTransaction>(merchantOutgoingTransactiondto));
           
            return Ok(new ResponseDTO()
            {
                success = true,
                message = "Successfully Create Transfere"
            });
        }

        [HttpPost("ApproveMerchantTransfere/{Id}")]
        public async Task<IActionResult> ApproveMerchantTransfere(int Id)
        {
            var result = await _merchantOutgoingTransactionService.ApproveMerchantTransfere(Id);
            return Ok(result);
        }
        

        [HttpGet("GetPendingMerchantTransactionList")]
        public async Task<IActionResult> GetPendingMerchantTransactionList([FromQuery] SearchParams param)
        {
            var result = await _merchantOutgoingTransactionService.GetPendingMerchantTransactionList(param);
            return Ok(result);
        }

        [HttpGet("GetApprovedMerchantTransactionList")]
        public async Task<IActionResult> GetApprovedMerchantTransactionList([FromQuery] SearchParams param)
        {
            var result = await _merchantOutgoingTransactionService.GetApprovedMerchantTransactionList(param);
            return Ok(result);
        }

        [HttpGet("getAccountBranch/{accountNo}")]
        public async Task<IActionResult> getAccountBranch(string accountNo)
        {
            var result = await _merchantNameCheckService.GetAccountBranch(accountNo);
            return Ok(result);
        }

        [HttpPost("SimulateLIBTransfer")]
        public async Task<IActionResult> SimulateLIBTransfer([FromBody] OutgoingTransfereDTO merchantOutgoingTransactiondto)
        {
            var result = await _merchantOutgoingTransactionService.SimulateLIBTransfer(_mapper.Map<MerchantOutgoingTransactionSimulation>(merchantOutgoingTransactiondto));
            return Ok(result);
        }
        
        [HttpGet("RejectMerchantTransfere/{Id}")]
        public async Task<IActionResult> RejectMerchantTransfere(int Id)
        {
            await _merchantOutgoingTransactionService.RejectMerchantTransfere(Id);
            return Ok();
        }
        
    }
}
