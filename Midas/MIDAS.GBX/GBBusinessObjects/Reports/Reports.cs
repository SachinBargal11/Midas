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
    public class VisitReports
    {
        [JsonProperty("provider")]
        public string ProviderName { get; set; }

        [JsonProperty("patientName")]
        public string PatientName { get; set; }

        [JsonProperty("month")]
        public string Month { get; set; }

        [JsonProperty("totalVisits")]
        public int TotalVisits { get; set; }

        [JsonProperty("scheduledVisits")]
        public int ScheduledVisits { get; set; }

        [JsonProperty("completedVisits")]
        public int CompletedVisits { get; set; }

        [JsonProperty("noshowVisits")]
        public int NoShowVisits { get; set; }
    }
}
