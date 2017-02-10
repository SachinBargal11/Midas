using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace MIDAS.GBX.BusinessObjects
{
    public class RefferingOffice : GbObject
    {

        [JsonProperty("patientId")]
        public int PatientId { get; set; }

        [JsonProperty("refferingOfficeId")]
        public byte? RefferingOfficeId { get; set; }

        [JsonProperty("addressInfoId")]
        public int? AddressInfoId { get; set; }

        [JsonProperty("refferingDoctorId")]
        public byte? ReffferingDoctorId { get; set; }

        [JsonProperty("npi")]
        public string NPI { get; set; }

        [JsonProperty("isCurrentReffOffice")]
        public bool IsCurrentReffOffice { get; set; }

        [JsonProperty("addressInfo")]
        public AddressInfo AddressInfo { get; set; }



        public override List<BusinessValidation> Validate<T>(T entity)
        {
            List<BusinessValidation> validations = new List<BusinessValidation>();
            BusinessValidation validation = new BusinessValidation();



            return validations;
        }
    }
}
