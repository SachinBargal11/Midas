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
using static MIDAS.GBX.BusinessObjects.GBEnums;
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
                boUser.CreateDate = user_.CreateDate;
                return (T)(object)boUser;
            }
            OTP user = entity as OTP;

            if (user == null)
                return default(T);

            BO.OTP boOTP = new BO.OTP();
            boOTP.Pin = user.Pin;
            boOTP.StatusCode = System.Net.HttpStatusCode.Accepted;
            boOTP.Message = "OTP sent";

            return (T)(object)boOTP;
        }
        #endregion

        #region Validate OTP
        public override Object ValidateOTP(JObject entity)
        {
            BO.OTP otpBO = entity["otp"].ToObject<BO.OTP>();
            BO.User userBO = entity["user"].ToObject<BO.User>();

            dynamic data_ = _context.OTPs.Where(x => x.OTP1 == otpBO.OTP1 && x.Pin==otpBO.Pin && (x.IsDeleted != true) && x.UserID== userBO.ID).FirstOrDefault();

            if (data_ == null)
            {
                otpBO.Message = "Invalid OTP";
                otpBO.StatusCode = System.Net.HttpStatusCode.NotFound;
                return otpBO;
            }
            else
            {
                BO.OTP acc_ = Convert<BO.OTP, OTP>(data_);
                acc_.StatusCode = System.Net.HttpStatusCode.Created;
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
                acc_.StatusCode = System.Net.HttpStatusCode.Created;
            }
            else
            {
                acc_.Message = "Invalid details";
                acc_.StatusCode = System.Net.HttpStatusCode.NotFound;
            }
            return (object)acc_;

        }
        #endregion

        #region Generate OTP
        public override Object RegenerateOTP(JObject entity)
        {
            BO.User otpUser = entity["user"].ToObject<BO.User>();


                var otpOld = _context.OTPs.Where(p => p.UserID == otpUser.ID).ToList<OTP>();
                otpOld.ForEach(a => { a.IsDeleted = true; a.UpdateDate = DateTime.UtcNow; a.UpdateByUserID = System.Convert.ToInt32(Utility.GetConfigValue("DefaultAdminUserID"));});
                if (otpOld != null)
                {
                    _context.SaveChanges();
                }

                OTP otpDB = new OTP();
                otpDB.OTP1 = Utility.GenerateRandomNumber(6);
                otpDB.Pin = Utility.GenerateRandomNo();
                otpDB.UserID = otpUser.ID;
                otpDB.CreateDate = DateTime.UtcNow;
                otpDB.CreateByUserID = System.Convert.ToInt32(Utility.GetConfigValue("DefaultAdminUserID"));

                _dbSet.Add(otpDB);
                _context.SaveChanges();

                BO.OTP acc = Convert<BO.OTP, OTP>(otpDB);

                dynamic data_ = _context.Users.Where(x => x.id == otpUser.ID && x.IsDeleted==null).FirstOrDefault();
                BO.User acc_ = Convert<BO.User, User>(data_);
                string Message = "Dear " + acc_.UserName + ",<br><br>As per your request, a One Time Password (OTP) has been generated and the same is <i><b>" + otpDB.OTP1.ToString() + "</b></i><br><br>Please use this OTP to complete the Login. Reference number is " + otpDB.Pin.ToString() + " <br><br>*** This is an auto-generated email. Please do not reply to this email.*** <br><br>Thanks";
                try
                {
                acc_.StatusCode = System.Net.HttpStatusCode.Created;
                Utility.SendEmail(Message, "Alert Message From GBX MIDAS", acc_.UserName);
                }
                catch(Exception ex)
                {
                acc_.StatusCode = System.Net.HttpStatusCode.Created;
                    acc_.Message = "OTP Generated.Error sending mail.";
                    return acc;
                }
                acc_.Message = "OTP sent";

            return Convert<BO.OTP, OTP>(otpDB);

        }
        #endregion

    }
}
