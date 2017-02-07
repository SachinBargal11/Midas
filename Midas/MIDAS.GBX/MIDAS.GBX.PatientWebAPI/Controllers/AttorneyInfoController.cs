using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MIDAS.GBX.PatientWebAPI.Controllers
{
    public class AttorneyInfoController : ApiController
    {
        // GET: api/AttorneyInfo
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/AttorneyInfo/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/AttorneyInfo
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/AttorneyInfo/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/AttorneyInfo/5
        public void Delete(int id)
        {
        }
    }
}
