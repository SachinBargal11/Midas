using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class SMS
    {
        public string FromNumber { get; set; }
        public string ToNumber { get; set; }
        public string Message { get; set; }

        //public override List<BusinessValidation> Validate<T>(T entity)
        //{
        //    List<BusinessValidation> validations = new List<BusinessValidation>();
        //    BusinessValidation validation = new BusinessValidation();            

        //    return validations;
        //}
    }
}
