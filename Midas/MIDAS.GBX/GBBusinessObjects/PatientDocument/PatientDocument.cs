using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class PatientDocument : GbObject
    {       
        [JsonProperty("patientId")]       
        public int PatientId { get; set; }

        [JsonProperty("midasDocumentId")]
        public int MidasDocumentId { get; set; }

        [JsonProperty("documentName")]
        public string DocumentName { get; set; }

        [JsonProperty("documentType")]
        public string DocumentType { get; set; }
    }

   
}
