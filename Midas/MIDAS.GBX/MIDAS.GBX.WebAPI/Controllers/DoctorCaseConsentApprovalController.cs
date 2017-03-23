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
    public class DoctorCaseConsentApprovalController : ApiController
    {
        private IRequestHandler<DoctorCaseConsentApproval> requestHandler;

        public DoctorCaseConsentApprovalController()
        {
            requestHandler = new GbApiRequestHandler<DoctorCaseConsentApproval>();
        }

    }

}
