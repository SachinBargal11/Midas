#region Imports
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using GBDataRepository.Model;
using Newtonsoft.Json.Linq;
using MIDAS.GBX.EntityRepository;
using MIDAS.GBX.DataRepository.Model;
using BO = MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.EN;
using MIDAS.GBX.Common;
#endregion

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class InvitationRepository : BaseEntityRepo
    {
        private DbSet<Invitation> _dbInvitation;

        #region Constructor
        public InvitationRepository(MIDASGBXEntities context)
            : base(context)
        {
            _dbInvitation = context.Set<Invitation>();

            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            BO.User boUser = new BO.User();
            Invitation invitation = entity as Invitation;
            if (invitation == null)
                return default(T);

            BO.Invitation boInvitation = new BO.Invitation();
            boUser.ID = invitation.UserID;
            boInvitation.InvitationID = invitation.InvitationID;
            boInvitation.User = boUser;
            return (T)(object)boInvitation;
        }


        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.Invitation invitationBO = (BO.Invitation)(object)entity;

            var result = invitationBO.Validate(invitationBO);
            return result;
        }
        #endregion

        #region Save Data
        public override object Save(JObject data)
        {
            return base.Save(data);
        }
        #endregion






        #region Validate Company
        public override object ValidateInvitation<T>(T data)
        {
            BO.Invitation invitationBO = (BO.Invitation)(object)data;

            //Find Record By UniqueID
            Invitation invitation = _context.Invitations.Where(p => p.UniqueID == invitationBO.UniqueID).FirstOrDefault<Invitation>();

            if (invitation != null)
            {
                invitation.IsActivated = true;
                invitation.IsExpired = true;
                invitation.UpdateDate = DateTime.UtcNow;
                invitation.UpdateByUserID = 0;
                _context.Entry(invitation).State = System.Data.Entity.EntityState.Modified;
                _context.SaveChanges();
            }
            else
            {

            }
            return (object)Convert<BO.Invitation, Invitation>(invitation); ;
        }
        #endregion
    }
}
