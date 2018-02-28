using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/search")]
    public class SearchController : ApiController
    {
        private IRequestHandler<SearchDoctors> requestHandlerSearchDoctors;
        private IRequestHandler<SearchMedicalProviders> requestHandlerSearchMedicalProviders;

        public SearchController()
        {
            requestHandlerSearchDoctors = new GbApiRequestHandler<SearchDoctors>();
            requestHandlerSearchMedicalProviders = new GbApiRequestHandler<SearchMedicalProviders>();
        }

        [HttpPost]
        [Route("getDoctors")]
        public HttpResponseMessage GetDoctors([FromBody]SearchDoctors searchDoctors)
        {
            return requestHandlerSearchDoctors.GetDoctors(Request, searchDoctors);
        }

        [HttpPost]
        [Route("getMedicalProviders")]
        public HttpResponseMessage GetMedicalProviders([FromBody]SearchMedicalProviders searchMedicalProviders)
        {
            return requestHandlerSearchMedicalProviders.GetMedicalProviders(Request, searchMedicalProviders);
        }
    }
}
