using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class Case : GbObject
    {
        public int PatientId { get; set; }
        public string CaseName { get; set; }
        public int CaseTypeId { get; set; }
        public decimal Age { get; set; }
        public DateTime DateOfInjury { get; set; }
        public int LocationId { get; set; }
        public int PatientAddressId { get; set; }
        public int PatientContactInfoId { get; set; }
        public int EmpInfo { get; set; }
        public int InsuranceInfoId { get; set; }
        public string VehiclePlateNo { get; set; }
        public int AccidentAddressId { get; set; }
        public string CarrierCaseNo { get; set; }
        public bool Transportation { get; set; }
        public DateTime DateOfFirstTreatment { get; set; }
        public int CaseStatusId { get; set; }
        public int AttorneyId { get; set; }

        public AddressInfo AddressInfo { get; set; }
        public AddressInfo AddressInfo1 { get; set; }
        public ContactInfo ContactInfo { get; set; }
        public InsuranceInfo InsuranceInfo { get; set; }
        public Location Location { get; set; }
        public PatientEmpInfo PatientEmpInfo { get; set; }
        public  User User { get; set; }


    }
}
