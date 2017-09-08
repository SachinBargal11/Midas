using MIDAS.GBX.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/InsuranceMaster")]
    public class InsuranceMasterController : ApiController
    {
        private IRequestHandler<InsuranceMaster> requestHandler;

        public InsuranceMasterController()
        {
            requestHandler = new GbApiRequestHandler<InsuranceMaster>();
        }
       
        //[HttpGet]
        //[Route("getAll")]
        ////[AllowAnonymous]
        //public HttpResponseMessage Get()
        //{
        //    return requestHandler.GetObjects(Request);
        //}

        [HttpGet]
        [Route("getInsuranceDetails/{id}/{companyId}")]
        public HttpResponseMessage GetInsuranceDetails(int id, int companyId)
        {
            return requestHandler.GetInsuranceDetails(Request, id, companyId);
        }

        [HttpDelete]
        [HttpGet]
        [Route("Delete/{id}/{companyId}")]
        public HttpResponseMessage Delete(int id, int companyId)
        {
            return requestHandler.Delete(Request, id, companyId);
        }

        [HttpPost]
        [Route("Add")]
        public HttpResponseMessage Post([FromBody]InsuranceMaster data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpGet]
        [Route("getMasterAndByCompanyId/{companyId}")]
        public HttpResponseMessage GetMasterAndByCompanyId(int companyId)
        {
            return requestHandler.GetMasterAndByCompanyId(Request, companyId);
        }

    }
}