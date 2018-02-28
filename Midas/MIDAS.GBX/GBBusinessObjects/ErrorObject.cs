using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class ErrorObject
    {
        [JsonProperty("errorLevel")]
        public ErrorLevel ErrorLevel { get; set; }

        [JsonProperty("errorMessage")]
        public string ErrorMessage { get; set; }

        [JsonProperty("errorObject")]
        public object errorObject { get; set; }

        [JsonProperty("statusCode")]
        public System.Net.HttpStatusCode statusCode { get; set; }
    }
}


public enum ErrorLevel
{
    Warning=1,
    Error=2,
    Critical=3,
    Validation=4,
    Exception=5,
    Information=6
}
