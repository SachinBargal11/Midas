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
    public class Patient : GbObject
    {

        public int PatientID { get; set; }
        public string SSN { get; set; }
        public string WCBNo { get; set; }
        public string JobTitle { get; set; }
        public string WorkActivities { get; set; }
        public string CarrierCaseNo { get; set; }
        public string ChartNo { get; set; }
        public int CompanyID { get; set; }
        public int LocationID { get; set; }

        public Company Company { get; set; }
        public Location Location { get; set; }
        public User User { get; set; }

        public override List<BusinessValidation> Validate<T>(T entity)
        {
            List<BusinessValidation> validations = new List<BusinessValidation>();
            BusinessValidation validation = new BusinessValidation();
            return validations;
        }
    }
}
