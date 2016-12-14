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
            if (typeof(T) == typeof(BO.Signup))
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
                repo = new LocationRepository(context);
            }
            if (typeof(T) == typeof(BO.Invitation))
            {
                repo = new InvitationRepository(context);
            }
            if (typeof(T) == typeof(BO.SaveLocation))
            {
                repo = new LocationRepository(context);
            }
            if (typeof(T) == typeof(BO.AddUser))
            {
                repo = new UserRepository(context);
            }
            if (typeof(T) == typeof(BO.ValidateOTP))
            {
                repo = new OTPRepository(context);
            }
            if (typeof(T) == typeof(BO.MedicalProvider))
            {
                repo = new MedicalProviderRepository(context);
            }
            if (typeof(T) == typeof(BO.Specialty))
            {
                repo = new SpecialityRepository(context);
            }
            if (typeof(T) == typeof(BO.SpecialtyDetails))
            {
                repo = new SpecialityDetailsRepository(context);
            }
            if (typeof(T) == typeof(BO.CompanySpecialtyDetails))
            {
                repo = new CompanySpecialityDetailsRepository(context);
            }
            if (typeof(T) == typeof(BO.Doctor))
            {
                repo = new DoctorRepository(context);
            } 
            if (typeof(T) == typeof(BO.DoctorSpeciality))
            {
                repo = new DoctorSpecialityRepository(context);
            }
            if (typeof(T) == typeof(BO.RoomTest))
            {
                repo = new RoomTestRepository(context);
            }
            if (typeof(T) == typeof(BO.Room))
            {
                repo = new RoomRepository(context);
            }
            if (typeof(T) == typeof(BO.LocationRoom))
            {
                repo = new LocationRoomRepository(context);
            }
            return repo;
        }
    }
}

