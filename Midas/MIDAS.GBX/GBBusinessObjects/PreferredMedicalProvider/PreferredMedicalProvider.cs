using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class PreferredMedicalProviderSignUp : GbObject
    {
      
        [JsonProperty("prefMedProviderId")]
        public int PrefMedProviderId { get; set; }

        [JsonProperty("companyId")]
        public int CompanyId { get; set; }

        [JsonProperty("IsCreated")]
        public bool IsCreated { get; set; }

        [JsonProperty("company")]
        public Company Company { get; set; }

        [JsonProperty("Signup")]
        public Signup Signup { get; set; }
    }

    public class PreferredMedicalProvider : GbObject
    {

        [JsonProperty("prefMedProviderId")]
        public int PrefMedProviderId { get; set; }

        [JsonProperty("companyId")]
        public int CompanyId { get; set; }

        [JsonProperty("IsCreated")]
        public bool IsCreated { get; set; }

        [JsonProperty("company")]
        public Company Company { get; set; }

        [JsonProperty("prefMedProvider")]
        public Company PrefMedProvider { get; set; }
    }

    public class PreferredMedicalCompany : GbObject
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("registrationComplete")]
        public bool RegistrationComplete { get; set; }

        [JsonProperty("doctor")]
        public List<Doctor> Doctor { get; set; }

        [JsonProperty("room")]
        public List<Room> Room { get; set; }
    }

}
