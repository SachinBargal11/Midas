using MIDAS.GBX.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/PreferredMedicalProvider")]

    public class PreferredMedicalProviderController : ApiController
    {
        private IRequestHandler<PreferredMedicalProviderSignUp> requestHandler;

        public PreferredMedicalProviderController()
        {
            requestHandler = new GbApiRequestHandler<PreferredMedicalProviderSignUp>();
        }

        [HttpGet]
        [Route("associateMedicalProviderWithCompany/{PrefMedProviderId}/{CompanyId}")]
        public HttpResponseMessage AssociateMedicalProviderWithCompany(int PrefMedProviderId, int CompanyId)
        {
            return requestHandler.AssociateMedicalProviderWithCompany(Request, PrefMedProviderId, CompanyId);
        }

        [HttpGet]
        [Route("getAllMedicalProviderExcludeAssigned/{CompanyId}")]
        public HttpResponseMessage GetAllMedicalProviderExcludeAssigned(int CompanyId)
        {
            return requestHandler.GetAllMedicalProviderExcludeAssigned(Request, CompanyId);
        }

        [HttpGet]
        [Route("get/{Id}")]
        public HttpResponseMessage Get(int Id)
        {
            return requestHandler.GetObject(Request, Id);
        }

        [HttpGet]
        [Route("getByCompanyId/{CompanyId}")]
        //[AllowAnonymous]
        public HttpResponseMessage GetByCompanyId(int CompanyId)
        {
            return requestHandler.GetGbObjects(Request, CompanyId);
        }

        [HttpGet]
        [Route("getByPrefMedProviderId/{PrefMedProviderId}")]
        //[AllowAnonymous]
        public HttpResponseMessage GetByPrefMedProviderId(int PrefMedProviderId)
        {
            return requestHandler.GetByPrefMedProviderId(Request, PrefMedProviderId);
        }

        [HttpPost]
        [Route("save")]
        public HttpResponseMessage Post([FromBody]PreferredMedicalProviderSignUp data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        
        [HttpPost]
        [Route("updateMedicalProvider")]
        public HttpResponseMessage UpdateMedicalProvider([FromBody]PreferredMedicalProviderSignUp data)
        {
            return requestHandler.UpdateMedicalProvider(Request, data);
        }

        [HttpGet]
        [Route("Delete/{id}")]
        public HttpResponseMessage Delete(int id)
        {
            return requestHandler.Delete(Request, id);
        }

        [HttpGet]
        [Route("getPreferredCompanyDoctorsAndRoomByCompanyId/{CompanyId}/{SpecialityId}/{RoomTestId}")]
        //[AllowAnonymous]
        public HttpResponseMessage GetPreferredCompanyDoctorsAndRoomByCompanyId(int CompanyId, int SpecialityId, int RoomTestId)
        {
            return requestHandler.GetPreferredCompanyDoctorsAndRoomByCompanyId(Request, CompanyId, SpecialityId, RoomTestId);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}

