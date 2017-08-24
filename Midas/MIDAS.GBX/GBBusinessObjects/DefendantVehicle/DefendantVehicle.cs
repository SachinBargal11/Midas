using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class DefendantVehicle : GbObject
    {
        [JsonProperty("caseId")]
        public int CaseId { get; set; }

        [JsonProperty("vehicleNumberPlate")]
        public string VehicleNumberPlate { get; set; }

        [JsonProperty("state")]
        public string State { get; set; }

        [JsonProperty("vehicleMakeModel")]
        public string VehicleMakeModel { get; set; }

        [JsonProperty("vehicleMakeYear")]
        public string VehicleMakeYear { get; set; }

        [JsonProperty("vehicleOwnerName")]
        public string VehicleOwnerName { get; set; }

        [JsonProperty("vehicleOperatorName")]
        public string VehicleOperatorName { get; set; }

        [JsonProperty("vehicleInsuranceCompanyName")]
        public string VehicleInsuranceCompanyName { get; set; }

        [JsonProperty("vehiclePolicyNumber")]
        public string VehiclePolicyNumber { get; set; }

        [JsonProperty("vehicleClaimNumber")]
        public string VehicleClaimNumber { get; set; }
    }
}
