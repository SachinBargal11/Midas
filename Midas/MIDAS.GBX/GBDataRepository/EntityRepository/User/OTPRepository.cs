using MIDAS.GBX.Common;
using MIDAS.GBX.DataRepository.Model;
using MIDAS.GBX.EN;
using MIDAS.GBX.EntityRepository;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class OTPRepository : BaseEntityRepo
    {
        private DbSet<OTP> _dbSet;

        #region Constructor
        public OTPRepository(MIDASGBXEntities context) : base(context)
        {
            _dbSet = context.Set<OTP>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            if(entity.GetType().Name=="User")
            {
                User user_ = entity as User;
                if (user_ == null)
                    return default(T);

                BO.User boUser = new BO.User();

                boUser.UserName = user_.UserName;
                boUser.ID = user_.id;
                boUser.FirstName = user_.FirstName;
                boUser.LastName = user_.LastName;
                boUser.ImageLink = user_.ImageLink;
                boUser.UserType = (BO.GBEnums.UserType)user_.UserType;
                boUser.Gender = (BO.GBEnums.Gender)user_.UserType;
                boUser.CreateByUserID = user_.CreateByUserID;
                return (T)(object)boUser;
            }
            OTP user = entity as OTP;

            if (user == null)
                return default(T);

            BO.OTP boOTP = new BO.OTP();
            boOTP.Pin = user.Pin;

            return (T)(object)boOTP;
        }
        #endregion

        #region Validate
        public override List<BO.BusinessValidation> Validate<T>(T entity)
        {
            dynamic result = null;
            if (typeof(T) == typeof(BO.ValidateOTP))
            {
                BO.ValidateOTP validateOTP = (BO.ValidateOTP)(object)entity;
                result = validateOTP.Validate(validateOTP);
            }
            if (typeof(T) == typeof(BO.OTP))
            {
                BO.OTP otp = (BO.OTP)(object)entity;
                result = otp.Validate(otp);
            }
            return result;
        }
        #endregion

        #region Validate OTP
        public override Object ValidateOTP<T>(T entity)
        {
            BO.ValidateOTP validateOTP = (BO.ValidateOTP)(object)entity;


            BO.OTP otpBO = validateOTP.otp;
            BO.User userBO = validateOTP.user;

            dynamic data_ = _context.OTPs.Where(x => x.OTP1 == otpBO.OTP1 && x.Pin==otpBO.Pin && (x.IsDeleted != true) && x.UserID== userBO.ID).FirstOrDefault();

            if (data_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "Invalid OTP", errorObject = "", ErrorLevel = ErrorLevel.Information };
            }
            else
            {
                BO.OTP acc_ = Convert<BO.OTP, OTP>(data_);
                return acc_;
            }

        }
        #endregion

        #region Get Valid OTPs
        public override Object Get(int id)
        {
            BO.OTP acc_ = Convert<BO.OTP, OTP>(_context.OTPs.Where(p => p.UserID == id && (p.IsDeleted!=null || p.IsDeleted!=true) ).FirstOrDefault<OTP>());

            if(acc_!=null)
            {
                return (object)acc_;
            }
            else
            {
                return new BO.ErrorObject { ErrorMessage = "Invalid OTP details", errorObject = "", ErrorLevel = ErrorLevel.Information };
            }
        }
        #endregion

        #region Generate OTP
        public override Object RegenerateOTP<T>(T entity)
        {
            BO.OTP otpUser = (BO.OTP)(object)entity;


                var otpOld = _context.OTPs.Where(p => p.UserID == otpUser.User.ID).ToList<OTP>();
                otpOld.ForEach(a => { a.IsDeleted = true; a.UpdateDate = DateTime.UtcNow; a.UpdateByUserID = System.Convert.ToInt32(Utility.GetConfigValue("DefaultAdminUserID"));});
                if (otpOld != null)
                {
                    _context.SaveChanges();
                }

                OTP otpDB = new OTP();
                otpDB.OTP1 = Utility.GenerateRandomNumber(6);
                otpDB.Pin = Utility.GenerateRandomNo();
                otpDB.UserID = otpUser.User.ID;
                otpDB.CreateDate = DateTime.UtcNow;
                otpDB.CreateByUserID = System.Convert.ToInt32(Utility.GetConfigValue("DefaultAdminUserID"));

                _dbSet.Add(otpDB);
                _context.SaveChanges();

                BO.OTP acc = Convert<BO.OTP, OTP>(otpDB);

                dynamic data_ = _context.Users.Where(x => x.id == otpUser.User.ID && x.IsDeleted == null).FirstOrDefault();
                BO.User acc_ = Convert<BO.User, User>(data_);
                string Message = "Dear " + acc_.UserName + ",<br><br>As per your request, a One Time Password (OTP) has been generated and the same is <i><b>" + otpDB.OTP1.ToString() + "</b></i><br><br>Please use this OTP to complete the Login. Reference number is " + otpDB.Pin.ToString() + " <br><br>*** This is an auto-generated email. Please do not reply to this email.*** <br><br>Thanks";
                try
                {
                Utility.SendEmail(Message, "Alert Message From GBX MIDAS", acc_.UserName);
                }
                catch(Exception ex)
                {
                    return acc;
                }

            return Convert<BO.OTP, OTP>(otpDB);

        }
        #endregion

    }
}
