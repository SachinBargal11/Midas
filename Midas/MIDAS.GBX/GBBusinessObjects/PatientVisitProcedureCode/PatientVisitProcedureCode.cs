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
    public class PatientVisitProcedureCode : GbObject
    {
        [JsonProperty("patientVisitId")]
        public int PatientVisitId { get; set; }

        [JsonProperty("procedureCodeId")]
        public int ProcedureCodeId { get; set; }

        [JsonProperty("procedureAmount")]
        public decimal? ProcedureAmount { get; set; }

        [JsonProperty("procedureUnit")]
        public decimal? ProcedureUnit { get; set; }

        [JsonProperty("procedureTotalAmount")]
        public decimal? ProcedureTotalAmount { get; set; }

        [JsonProperty("procedureCode")]
        public ProcedureCode ProcedureCode { get; set; }

        [JsonProperty("patientVisit")]
        public PatientVisit PatientVisit { get; set; }

    }

    public class mPatientVisitProcedureCode : GbObject
    {
        [JsonProperty("patientVisitId")]
        public int PatientVisitId { get; set; }

        [JsonProperty("procedureCodeId")]
        public int ProcedureCodeId { get; set; }

        [JsonProperty("procedureCode")]
        public mProcedureCode mProcedureCode { get; set; }

        [JsonProperty("procedureAmount")]
        public decimal? ProcedureAmount { get; set; }

        [JsonProperty("procedureUnit")]
        public decimal? ProcedureUnit { get; set; }

        [JsonProperty("procedureTotalAmount")]
        public decimal? ProcedureTotalAmount { get; set; }

        //[JsonProperty("mPatientVisit")]
        //public mPatientVisit mPatientVisit { get; set; }

    }
}

