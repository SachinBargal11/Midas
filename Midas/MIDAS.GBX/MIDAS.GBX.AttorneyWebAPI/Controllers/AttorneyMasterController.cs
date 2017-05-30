using MIDAS.GBX.BusinessObjects;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace MIDAS.GBX.AttorneyWebAPI.Controllers
{
    [RoutePrefix("midasattorneyapi/AttorneyMaster")]

    public class AttorneyMasterController : ApiController
    {
        private IRequestHandler<AttorneyMaster> requestHandler;

        public AttorneyMasterController()
        {
            requestHandler = new GbApiRequestHandler<AttorneyMaster>();
        }

        [HttpGet]
        [Route("getAll")]
        //[AllowAnonymous]
        public HttpResponseMessage GetAllAttornies()
        {
            return requestHandler.GetObjects(Request);
        }

        [HttpGet]
        [Route("get/{id}")]
        //[AllowAnonymous]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpGet]
        [Route("getByCompanyId/{CompanyId}")]
        //[AllowAnonymous]
        public HttpResponseMessage GetByCompanyId(int CompanyId)
        {
            return requestHandler.GetGbObjects(Request, CompanyId);
        }

        
        [HttpGet]
        [Route("getAllExcludeCompany/{CompanyId}")]
        //[AllowAnonymous]
        public HttpResponseMessage GetAllExcludeCompany(int CompanyId)
        {
            return requestHandler.GetAllExcludeCompany(Request, CompanyId);
        }

        [HttpGet]
        [Route("associateAttorneyWithCompany/{attorneyId}/{CompanyId}")]
        //[AllowAnonymous]
        public HttpResponseMessage AssociateAttorneyWithCompany(int AttorneyId, int CompanyId)
        {
            return requestHandler.AssociateAttorneyWithCompany(Request,AttorneyId,CompanyId);
        }

        [HttpGet]
        [Route("disassociateAttorneyWithCompany/{attorneyId}/{CompanyId}")]
        //[AllowAnonymous]
        public HttpResponseMessage DisassociateAttorneyWithCompany(int AttorneyId, int CompanyId)
        {
            return requestHandler.DisassociateAttorneyWithCompany(Request, AttorneyId, CompanyId);
        }

        [HttpPost]
        [Route("save")]
        //[AllowAnonymous]
        public HttpResponseMessage Post([FromBody]AttorneyMaster data)
        { return requestHandler.CreateGbObject(Request, data); }

        //[HttpGet]
        //[Route("associateAttorneyProviderWithCompany/{AttorneyProviderId}/{CompanyId}")]
        //public HttpResponseMessage AssociateAttorneyProviderWithCompany(int AttorneyProviderId, int CompanyId)
        //{
        //    return requestHandler.AssociateAttorneyProviderWithCompany(Request, AttorneyProviderId, CompanyId);
        //}

        //[HttpGet]
        //[Route("getAllAttorneyProviderExcludeAssigned/{CompanyId}")]
        //public HttpResponseMessage GetAllAttorneyProviderExcludeAssigned(int CompanyId)
        //{
        //    return requestHandler.GetAllAttorneyProviderExcludeAssigned(Request, CompanyId);
        //}

        //[HttpGet]
        //[Route("getAttorneyProviderByCompanyId/{CompanyId}")]
        //[AllowAnonymous]
        //public HttpResponseMessage GetAttorneyProviderByCompanyId(int CompanyId)
        //{
        //    return requestHandler.GetAttorneyProviderByCompanyId(Request, CompanyId);
        //}

        [HttpGet]
        [Route("Delete/{id}")]
        public HttpResponseMessage Delete(int id)
        {
            return requestHandler.Delete(Request, id);
        }

        protected override void Dispose(bool disposing) { base.Dispose(disposing); }
    }
}