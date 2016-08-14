using Midas.GreenBill.BusinessObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midas.GreenBill.BusinessObject
{
    public class ProviderMedicalFacility : GbObject
    {
        public  Address BillingAddress { get; set; }
        public  Address TreatingAddress { get; set; }
        public  ContactInfo BillingContactInfo { get; set; }
        public  ContactInfo TreatingContactInfo { get; set; }
        public  MedicalFacility MedicalFacility { get; set; }
        public  Provider Provider { get; set; }
    }
}
