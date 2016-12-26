using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class Log : GbObject
    {

        public string requestId { get; set; }
        public string responseId { get; set; }
        public string ipaddress { get; set; }
        public string country { get; set; }
        public string machinename { get; set; }
        public int userId { get; set; }
        public string requestUrl { get; set; }

        public override List<BusinessValidation> Validate<T>(T entity)
        {
            List<BusinessValidation> validations = new List<BusinessValidation>();
            BusinessValidation validation = new BusinessValidation();
            return validations;
        }
    }
}
