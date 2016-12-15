using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace MIDAS.GBX.BusinessObjects
{
    public class SaveLocation : GbObject
    {
        public AddressInfo addressInfo
        {
            get;
            set;
        }

        public Company company
        {
            get;
            set;
        }

        public ContactInfo contactInfo
        {
            get;
            set;
        }

        public Location location
        {
            get;
            set;
        }
        public Schedule schedule
        {
            get;
            set;
        }
        public SaveLocation()
        {
        }

        public override List<BusinessValidation> Validate<T>(T entity)
        {
            List<BusinessValidation> businessValidations = new List<BusinessValidation>();
            BusinessValidation businessValidation = new BusinessValidation();
            if (location.ID == 0)
            {
                if (string.IsNullOrEmpty(this.location.Name))
                {
                    businessValidations.Add(new BusinessValidation()
                    {
                        ValidationResult = BusinessValidationResult.Failure,
                        ValidationMessage = "Location name is required"
                    });
                }
                if (string.IsNullOrEmpty(this.location.LocationType.ToString()))
                {
                    businessValidations.Add(new BusinessValidation()
                    {
                        ValidationResult = BusinessValidationResult.Failure,
                        ValidationMessage = "Location type is required"
                    });
                }
                if (string.IsNullOrEmpty(this.location.IsDefault.ToString()))
                {
                    businessValidations.Add(new BusinessValidation()
                    {
                        ValidationResult = BusinessValidationResult.Failure,
                        ValidationMessage = "Default location  is required"
                    });
                }
            }
            return businessValidations;
        }
    }
}