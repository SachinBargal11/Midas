using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class InsuranceInfo : GbObject
    {
        public int PatientId { get; set; }
        public int InsuranceId { get; set; }
        public string PolicyNo { get; set; }
        public string PolicyHoldersName { get; set; }
        public int InsuranceAddressId { get; set; }
        public int InsuranceContactInfoId { get; set; }
        public bool IsPrimaryInsurance { get; set; }

        public Case Cases{ get; set; }
        public AddressInfo AddressInfo { get; set; }
        public ContactInfo ContactInfo { get; set; }
        public User User { get; set; }


    }
}
