using MIDAS.GBX.BusinessObjects;
using System.Net.Http;
using System.Web.Http;

namespace MIDAS.GBX.AncillaryWebAPI.Controllers
{
    [RoutePrefix("midasancillaryapi/IMEVisit")]
    public class IMEVisitController : ApiController
    {
        private IRequestHandler<IMEVisit> requestHandler;

        public IMEVisitController()
        {
            requestHandler = new GbApiRequestHandler<IMEVisit>();
        }

        [HttpGet]
        [Route("getByAncillaryId/{AncillaryId}")]
        public HttpResponseMessage GetByAncillaryId(int AncillaryId)
        {
            return requestHandler.GetByAncillaryId(Request, AncillaryId);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
