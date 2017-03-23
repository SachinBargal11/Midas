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
    [RoutePrefix("midasapi/CaseCompanyMapping")]

    public class CaseCompanyMappingController : ApiController
    {
        private IRequestHandler<CaseCompanyMapping> requestHandler;

        public CaseCompanyMappingController()
        {
            requestHandler = new GbApiRequestHandler<CaseCompanyMapping>();
        }

    }
}
