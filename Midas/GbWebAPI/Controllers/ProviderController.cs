using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GbWebAPI.Controllers
{
    public class ProviderController : ApiController
    {
        // GET: api/Provider
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Provider/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Provider
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Provider/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Provider/5
        public void Delete(int id)
        {
        }
    }
}
