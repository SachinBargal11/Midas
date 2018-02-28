using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class PatientEmpInfo : GbObject
    {
        [JsonProperty("caseId")]
        public int CaseId { get; set; }

        [JsonProperty("jobTitle")]
        public string JobTitle { get; set; }

        [JsonProperty("empName")]
        public string EmpName { get; set; }

        [JsonProperty("addressInfoId")]
        public int? AddressInfoId { get; set; }

        [JsonProperty("contactInfoId")]
        public int? ContactInfoId { get; set; }

        [JsonProperty("addressInfo")]
        public AddressInfo AddressInfo { get; set; }

        [JsonProperty("contactInfo")]
        public ContactInfo ContactInfo { get; set; }

        [JsonProperty("salary")]
        public string Salary { get; set; }

        [JsonProperty("hourOrYearly")]
        public bool? HourOrYearly { get; set; }

        [JsonProperty("lossOfEarnings")]
        public bool? LossOfEarnings { get; set; }

        [JsonProperty("datesOutOfWork")]
        public string DatesOutOfWork { get; set; }

        [JsonProperty("hoursPerWeek")]
        public decimal? HoursPerWeek { get; set; }

        [JsonProperty("accidentAtEmployment")]
        public bool? AccidentAtEmployment { get; set; }
    }

    public class mPatientEmpInfo : GbObject
    {
        [JsonProperty("caseId")]
        public int CaseId { get; set; }

        [JsonProperty("empName")]
        public string EmpName { get; set; }

        [JsonProperty("addressInfoId")]
        public int? AddressInfoId { get; set; }

        [JsonProperty("contactInfoId")]
        public int? ContactInfoId { get; set; }

        [JsonProperty("isCurrentEmp")]
        public bool? IsCurrentEmp { get; set; }

        [JsonProperty("mAddressInfo")]
        public mAddressInfo mAddressInfo { get; set; }

        [JsonProperty("mContactInfo")]
        public mContactInfo mContactInfo { get; set; }

    }
}
