using MIDAS.GBX.BusinessObjects;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/ICDTypeCode")]

    public class ICDTypeCodeController : ApiController
    {
        private IRequestHandler<CompanyICDTypeCode> requestHandler;

        public ICDTypeCodeController()
        {
            requestHandler = new GbApiRequestHandler<CompanyICDTypeCode>();
        }


        [HttpGet]
        [Route("getICDTypeCodeByCompanyId/{CompanyId}")]
        public HttpResponseMessage GetICDTypeCodeByCompanyId(int CompanyId)
        {
            return requestHandler.GetICDTypeCodeByCompanyId(Request, CompanyId);
        }


        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}