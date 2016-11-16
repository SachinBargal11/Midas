using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BO = MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.EntityRepository;
using MIDAS.GBX.DataRepository.Model;
using MIDAS.GBX.DataRepository.EntityRepository;

namespace MIDAS.GBX
{
    internal class RepoFactory
    {
        internal static BaseEntityRepo GetRepo<T>(MIDASGBXEntities context)
        {
            BaseEntityRepo repo = null;
            if (typeof(T) == typeof(BO.Company))
            {
                repo = new CompanyRepository(context);
            }
            if (typeof(T) == typeof(BO.User))
            {
                repo = new UserRepository(context);
            }
            if (typeof(T) == typeof(BO.OTP))
            {
                repo = new OTPRepository(context);
            }
            if (typeof(T) == typeof(BO.PasswordToken))
            {
                repo = new PasswordTokenRepository(context);
            }
            if (typeof(T) == typeof(BO.Location))
            {
                repo = new PasswordTokenRepository(context);
            }
            if (typeof(T) == typeof(BO.MedicalProvider))
            {
                repo = new PasswordTokenRepository(context);
            }
            if (typeof(T) == typeof(BO.Specialty))
            {
                repo = new PasswordTokenRepository(context);
            }
            if (typeof(T) == typeof(BO.SpecialtyDetails))
            {
                repo = new PasswordTokenRepository(context);
            }
            if (typeof(T) == typeof(BO.Doctor))
            {
                repo = new PasswordTokenRepository(context);
            }
            if (typeof(T) == typeof(BO.DoctorSpeciality))
            {
                repo = new PasswordTokenRepository(context);
            }
            return repo;
        }
    }
}

