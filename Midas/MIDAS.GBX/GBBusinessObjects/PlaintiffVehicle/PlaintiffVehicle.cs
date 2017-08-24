using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class PlaintiffVehicle : GbObject
    {
        [JsonProperty("caseId")]
        public int CaseId { get; set; }

        [JsonProperty("numberPlate")]
        public string NumberPlate { get; set; }

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

        [JsonProperty("vehicleLocation")]
        public string VehicleLocation { get; set; }

        [JsonProperty("vehicleDamageDiscription")]
        public string VehicleDamageDiscription { get; set; }

        [JsonProperty("relativeVehicle")]
        public bool? RelativeVehicle { get; set; }

        [JsonProperty("relativeVehicleMakeModel")]
        public string RelativeVehicleMakeModel { get; set; }

        [JsonProperty("relativeVehicleMakeYear")]
        public string RelativeVehicleMakeYear { get; set; }

        [JsonProperty("relativeVehicleOwnerName")]
        public string RelativeVehicleOwnerName { get; set; }

        [JsonProperty("relativeVehicleInsuranceCompanyName")]
        public string RelativeVehicleInsuranceCompanyName { get; set; }

        [JsonProperty("relativeVehiclePolicyNumber")]
        public string RelativeVehiclePolicyNumber { get; set; }

        [JsonProperty("vehicleResolveDamage")]
        public bool? VehicleResolveDamage { get; set; }

        [JsonProperty("vehicleDriveable")]
        public bool? VehicleDriveable { get; set; }

        [JsonProperty("vehicleEstimatedDamage")]
        public decimal? VehicleEstimatedDamage { get; set; }

        [JsonProperty("relativeVehicleLocation")]
        public string RelativeVehicleLocation { get; set; }

        [JsonProperty("vehicleClientHaveTitle")]
        public bool? VehicleClientHaveTitle { get; set; }

        [JsonProperty("relativeVehicleOwner")]
        public string RelativeVehicleOwner { get; set; }
    }
}
