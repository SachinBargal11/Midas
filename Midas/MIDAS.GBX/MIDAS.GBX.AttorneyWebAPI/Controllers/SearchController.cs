using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.AttorneyWebAPI.Controllers
{
    [RoutePrefix("midasattorneyapi/search")]
    public class SearchController : ApiController
    {
        private IRequestHandler<SearchDoctors> requestHandlerSearchDoctors;

        public SearchController()
        {
            requestHandlerSearchDoctors = new GbApiRequestHandler<SearchDoctors>();
        }

        [HttpPost]
        [Route("getDoctors")]
        public HttpResponseMessage GetDoctors([FromBody]SearchDoctors searchDoctors)
        {
            return requestHandlerSearchDoctors.GetDoctors(Request, searchDoctors);
        }
    }
}
