using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class PatientInsuranceInfo : GbObject
    {
        public int PatientId { get; set; }
        public string PolicyHoldersName { get; set; }
        public int? PolicyHolderAddressInfoId { get; set; }
        public int? PolicyHolderContactInfoId { get; set; }
        public int? PolicyOwnerId { get; set; }
        public string InsuranceCompanyCode { get; set; }
        public int? InsuranceCompanyAddressInfoId { get; set; }
        public int? InsuranceCompanyContactInfoId { get; set; }
        public string PolicyNo { get; set; }
        public string ContactPerson { get; set; }
        public string ClaimFileNo { get; set; }
        public string WCBNo { get; set; }
        public byte? InsuranceType { get; set; }
        public bool? IsInActive { get; set; }

        public AddressInfo AddressInfo { get; set; }
        public AddressInfo AddressInfo1 { get; set; }
        public ContactInfo ContactInfo { get; set; }
        public ContactInfo ContactInfo1 { get; set; }
        public Patient2 Patient2 { get; set; }
        public Patient2 Patient21 { get; set; }

    }
}
