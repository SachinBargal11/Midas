using Midas.GreenBill.BusinessObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GBBusinessObjects
{
    public class Response
    {
        public Account account { get; set; }
        public MedicalFacility medicalFacility { get; set; }
        public Provider provider { get; set; }
        public User user { get; set; }
        public Address address { get; set; }
        public ContactInfo contactInfo { get; set; }
        public ProviderMedicalFacility providerMedicalFacility { get; set; }
    }
}
