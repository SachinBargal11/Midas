using Midas.GreenBill.BusinessObject;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GBBusinessObjects.Validation
{
    public class Validations
    {
        public class RequiredWhenAccountID : ValidationAttribute
        {
            protected override ValidationResult IsValid(object value, ValidationContext validationContext)
            {
                var obj = (Account)validationContext.ObjectInstance;
                if (obj.ID>1)
                {
                    return ValidationResult.Success;
                }
                var name = value as String;
                return string.IsNullOrEmpty(name) ? new ValidationResult("Name is required.") : ValidationResult.Success;
            }
        }
    }
}
