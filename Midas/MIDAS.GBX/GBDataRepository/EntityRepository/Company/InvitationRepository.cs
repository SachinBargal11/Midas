#region Imports
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
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
            BO.Company boCompany = new BO.Company();
            Invitation invitation = entity as Invitation;
            if (invitation == null)
                return default(T);

            BO.Invitation boInvitation = new BO.Invitation();
            boUser.ID = invitation.UserID;
            boInvitation.InvitationID = invitation.InvitationID;
            boInvitation.User = boUser;

            if (invitation.User.UserCompanies != null && invitation.User.UserCompanies.Count > 0)
            {
                List<BO.UserCompany> boUserCompany = new List<BO.UserCompany>();
                invitation.User.UserCompanies.Where(p => p.IsAccepted == true && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                  .ToList().ForEach(x => boUserCompany.Add(new BO.UserCompany() { CompanyId = x.CompanyID, UserId = x.UserID, UserStatusID = (BO.GBEnums.UserStatu)x.UserStatusID, CreateByUserID = x.CreateByUserID, ID = x.id, IsDeleted = x.IsDeleted, UpdateByUserID = x.UpdateByUserID }));
                boInvitation.User.UserCompanies = boUserCompany;
            }



            boCompany.ID = invitation.CompanyID;
            boInvitation.Company = boCompany;

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
        public override object Save<T>(T data)
        {
            return base.Save(data);
        }
        #endregion


        #region Validate Company
        public override object ValidateInvitation<T>(T data)
        {
            BO.Invitation invitationBO = (BO.Invitation)(object)data;
            //Find Record By UniqueID
            Invitation invitation = _context.Invitations.Include("Company")
                                                        .Include("User.UserCompanies")
                                                        .Where(p => p.UniqueID == invitationBO.UniqueID).FirstOrDefault<Invitation>();

            if (invitation != null)
            {
                invitation.IsActivated = true;
                invitation.IsExpired = true;
                invitation.UpdateByUserID = 0;
                invitation.UpdateDate = invitationBO.UpdateDate;
                _context.Entry(invitation).State = System.Data.Entity.EntityState.Modified;
                _context.SaveChanges();
            }
            else
            {
                return new BO.ErrorObject { ErrorMessage = "Invalid appkey or other parameters.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            return (object)Convert<BO.Invitation, Invitation>(invitation);
        }
        #endregion
    }
}
