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
    internal class UserTokenRepository : BaseEntityRepo
    {
        private DbSet<UserToken> _dbSet;

        #region Constructor
        public UserTokenRepository(MIDASGBXEntities context) : base(context)
        {
            _dbSet = context.Set<UserToken>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            UserToken user = entity as UserToken;
            if (user == null)
                return default(T);

            BO.UserToken boUserToken = new BO.UserToken();
            boUserToken.AuthToken = "";
            boUserToken.ExpiresOn = DateTime.Now;

            return (T)(object)boUserToken;
        }
        #endregion

        #region Generate Token
        public override Object GenerateToken(int id)
        {
            
            string AuthTokenExpiry = "";
            ConfigReader.Settings.GetSettingValue<UserToken>("AuthTokenExpiry", out AuthTokenExpiry);
            string DefaultAdminUserID ="";
            ConfigReader.Settings.GetSettingValue<UserToken>("DefaultAdminUserID", out DefaultAdminUserID);
            string token = Guid.NewGuid().ToString();
            DateTime issuedOn = DateTime.Now;
            DateTime expiredOn = DateTime.Now.AddSeconds(System.Convert.ToDouble(AuthTokenExpiry));

            UserToken userTokenDB = new UserToken();

            userTokenDB.UserId = id;
            userTokenDB.AuthToken = token;
            userTokenDB.IssuedOn = issuedOn;
            userTokenDB.ExpiresOn = expiredOn;
            userTokenDB.CreateDate = DateTime.UtcNow;
            userTokenDB.CreateByUserID = System.Convert.ToInt32(DefaultAdminUserID);

            _dbSet.Add(userTokenDB);
            _context.SaveChanges();

            BO.UserToken acc_ = Convert<BO.UserToken, UserToken>(userTokenDB);
            var res = (BO.GbObject)(object)acc_;
            return (object)res;
        }

        #endregion

        #region Validate Token
        public override Object ValidateToken(string tokenId)
        {
            UserToken token = _context.UserTokens.Where(x => x.AuthToken == tokenId && x.ExpiresOn>DateTime.Now).FirstOrDefault<UserToken>();
            if (token != null && !(DateTime.Now > token.ExpiresOn))
            {
                string AuthTokenExpiry = "";
                ConfigReader.Settings.GetSettingValue<UserToken>("AuthTokenExpiry", out AuthTokenExpiry);
                token.ExpiresOn = token.ExpiresOn.AddSeconds(
                                              System.Convert.ToDouble(AuthTokenExpiry));
                token.UpdateDate = DateTime.UtcNow;
                token.UpdateByUserID = 0;
                _context.Entry(token).State = System.Data.Entity.EntityState.Modified;
                _context.SaveChanges();
                return true;
            }
            return false;
        }
        #endregion

        #region Kill Token
        public override Object Kill(int tokenId)
        {
            try
            {
                _dbSet.Remove(_context.UserTokens.Single<UserToken>(p => p.id == tokenId));
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }
        #endregion

        #region DeleteByUserId
        public override Object DeleteByUserId(int userId)
        {
            try
            {
                _dbSet.Remove(_context.UserTokens.Single<UserToken>(p => p.UserId == userId));
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }
        #endregion
    }
}
