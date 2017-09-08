using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class AccidentTreatment : GbObject
    {
        [JsonProperty("patientAccidentInfoId")]
        public int PatientAccidentInfoId { get; set; }

        [JsonProperty("medicalFacilityName")]
        public string MedicalFacilityName { get; set; }

        [JsonProperty("doctorName")]
        public string DoctorName { get; set; }

        [JsonProperty("contactNumber")]
        public string ContactNumber { get; set; }

        [JsonProperty("address")]
        public string Address { get; set; }
    }
}
