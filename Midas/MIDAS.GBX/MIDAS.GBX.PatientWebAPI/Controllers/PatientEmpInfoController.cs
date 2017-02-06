using MIDAS.GBX.BusinessObjects;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using MIDAS.GBX.PatientWebAPI.RequestHandler;

namespace MIDAS.GBX.PatientWebAPI.Controllers
{
    [RoutePrefix("midaspatientapi/PatientEmpInfo")]

    public class PatientEmpInfoController : ApiController
    {
        private IRequestHandler<PatientEmpInfo> requestHandler;

        public PatientEmpInfoController()
        {
            requestHandler = new GbApiRequestHandler<PatientEmpInfo>();
        }

        // GET: api/Organizations/5
        [HttpGet]
        [Route("Get/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }


        [HttpGet]
        [Route("GetAll")]
        [AllowAnonymous]
        public HttpResponseMessage GetAllPatient([FromBody]PatientEmpInfo data)
        {
            return requestHandler.GetGbObjects(Request, data);
        }

        [HttpPost]
        [Route("Save")]
        [AllowAnonymous]
        public HttpResponseMessage Post([FromBody]PatientEmpInfo data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }


        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}