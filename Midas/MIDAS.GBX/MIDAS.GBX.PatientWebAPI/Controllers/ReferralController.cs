using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MIDAS.GBX.PatientWebAPI.RequestHandler;
using MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.PatientWebAPI.Controllers
{
    [RoutePrefix("midaspatientapi/Referral_OLD")]

    public class ReferralController : ApiController
    {
        //private IRequestHandler<Referral> requestHandler;

        public ReferralController()
        {
            //requestHandler = new GbApiRequestHandler<Referral>();
        }

        //[HttpGet]
        //[Route("get/{id}")]
        //[AllowAnonymous]
        //public HttpResponseMessage Get(int id)
        //{
        //    return requestHandler.GetObject(Request, id);
        //}

        //[HttpGet]
        //[Route("getByCaseId/{CaseId}")]
        //[AllowAnonymous]
        //public HttpResponseMessage GetByCaseId(int CaseId)
        //{
        //    return requestHandler.GetByCaseId(Request, CaseId);
        //}

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }


}
