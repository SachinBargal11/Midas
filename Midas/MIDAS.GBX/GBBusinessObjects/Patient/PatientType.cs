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
    public class PatientType : GbObject
    {
        public string PatientTypeText { get; set; }
        public PatientAccidentInfo PatientAccidentInfo { get; set; }
    }

    public class mPatientType : GbObject
    {
        public string PatientTypeText { get; set; }
        public mPatientAccidentInfo mPatientAccidentInfo { get; set; }
    }
}
