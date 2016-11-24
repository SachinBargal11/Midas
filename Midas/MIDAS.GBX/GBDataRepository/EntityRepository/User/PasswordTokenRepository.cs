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
    internal class PasswordTokenRepository : BaseEntityRepo
    {
        private DbSet<PasswordToken> _dbSet;

        #region Constructor
        public PasswordTokenRepository(MIDASGBXEntities context) : base(context)
        {
            _dbSet = context.Set<PasswordToken>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            PasswordToken user = entity as PasswordToken;

            if (user == null)
                return default(T);

            BO.PasswordToken boPasswordToken = new BO.PasswordToken();
            return (T)(object)boPasswordToken;
        }
        #endregion

        #region ValidatePassword
        public override Object ValidatePassword<T>(T entity)
        {
            BO.PasswordToken passwordBO = (BO.PasswordToken)(object)entity;

            PasswordToken data_ = _context.PasswordTokens.Where(x => x.IsTokenUsed != true && x.TokenHash == passwordBO.UniqueID).FirstOrDefault();

            if (data_ != null)
            {
                User usr = _context.Users.Where(x => x.UserName == data_.UserName).FirstOrDefault();

                BO.User userBO = new BO.User { Message = "Password link validated", ID = usr.id, StatusCode = System.Net.HttpStatusCode.Created };
                return userBO;
            }
            else
            {
                BO.User userBO = new BO.User { Message = "Invalid password link", StatusCode = System.Net.HttpStatusCode.NotFound };
                return userBO;
            }
        }
        #endregion


        #region GeneratePasswordLink
        public override Object GeneratePasswordLink<T>(T entity)
        {
            BO.PasswordToken passwordBO = (BO.PasswordToken)(object)entity;

            dynamic data_ = _context.Users.Where(x => x.UserName == passwordBO.UserName).FirstOrDefault();
            if (data_ == null)
            {
                return new BO.User { ErrorMessage = "No record found for this username.", StatusCode = System.Net.HttpStatusCode.NoContent };
            }

            PasswordToken passwordDB = new PasswordToken();
            passwordDB.TokenHash = Guid.NewGuid();
            passwordDB.UserName = passwordBO.UserName;
            passwordDB.CreateDate = DateTime.UtcNow;
            passwordDB.CreateByUserID = System.Convert.ToInt32(Utility.GetConfigValue("DefaultAdminUserID"));

            _dbSet.Add(passwordDB);
            _context.SaveChanges();

            BO.PasswordToken acc = Convert<BO.PasswordToken, PasswordToken>(passwordDB);

            string Message = "Dear " + passwordBO.UserName + ",<br><br>You are receiving this email because you (or someone pretending to be you) requested that your password be reset on the " + Utility.GetConfigValue("Website") + " site.  If you do not wish to reset your password, please ignore this message.<br><br>To reset your password, please click the following link, or copy and paste it into your web browser:<br><br>" + Utility.GetConfigValue("ForgotPasswordLink") +"/"+ passwordDB.TokenHash+ " <br><br>Your username, in case you've forgotten: " + passwordDB.UserName+ "<br><br>Thanks";
            try
            {
                acc.StatusCode = System.Net.HttpStatusCode.Created;
                Utility.SendEmail(Message, "Password Reset on MIDAS GBX", passwordBO.UserName);
            }
            catch (Exception ex)
            {
                acc.StatusCode = System.Net.HttpStatusCode.Created;
                acc.Message = "Link Generated.Error sending mail.";
                return acc;
            }
            acc.Message = "Password reset link sent";

            return acc;

        }
        #endregion

    }
}
