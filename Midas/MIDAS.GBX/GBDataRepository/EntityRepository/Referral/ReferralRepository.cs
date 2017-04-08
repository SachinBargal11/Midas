using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MIDAS.GBX.DataRepository.Model;
using System.Data.Entity;
using BO = MIDAS.GBX.BusinessObjects;
using System.Configuration;
using MIDAS.GBX.EN;
using Docs.Pdf;
using System.IO;
//using Docs.Pdf;

namespace MIDAS.GBX.DataRepository.EntityRepository.Common
{
    internal class ReferralRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<Referral> _dbReferral;

        public ReferralRepository(MIDASGBXEntities context) : base(context)
        {
            _dbReferral = context.Set<Referral>();
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            Referral referral = entity as Referral;

            if (referral == null)
                return default(T);

            BO.Referral referralBO = new BO.Referral();

            referralBO.ID = referral.Id;
            referralBO.CaseId = referral.CaseId;
            referralBO.ReferringCompanyId = referral.ReferringCompanyId;
            referralBO.ReferringLocationId = referral.ReferringLocationId;
            referralBO.ReferringUserId = referral.ReferringUserId;
            referralBO.ReferredToCompanyId = referral.ReferredToCompanyId;
            referralBO.ReferredToLocationId = referral.ReferredToLocationId;
            referralBO.ReferredToDoctorId = referral.ReferredToDoctorId;
            referralBO.ReferredToRoomId = referral.ReferredToRoomId;
            referralBO.Note = referral.Note;
            referralBO.ReferredByEmail = referral.ReferredByEmail;
            referralBO.ReferredToEmail = referral.ReferredToEmail;
            referralBO.ReferralAccepted = referral.ReferralAccepted;
            referralBO.IsDeleted = referral.IsDeleted;
            referralBO.CreateByUserID = referral.CreateByUserID;
            referralBO.UpdateByUserID = referral.UpdateByUserID;

            if (referral.Company != null)
            {
                BO.Company boCompany = new BO.Company();
                using (CompanyRepository cmp = new CompanyRepository(_context))
                {
                    boCompany = cmp.Convert<BO.Company, Company>(referral.Company);
                    referralBO.Company = boCompany;
                }
            }
            if (referral.Company1 != null)
            {
                BO.Company boCompany1 = new BO.Company();
                using (CompanyRepository cmp = new CompanyRepository(_context))
                {
                    boCompany1 = cmp.Convert<BO.Company, Company>(referral.Company1);
                    referralBO.Company1 = boCompany1;
                }
            }
            if (referral.Location != null)
            {
                BO.Location boLocation = new BO.Location();
                using (LocationRepository cmp = new LocationRepository(_context))
                {
                    boLocation = cmp.Convert<BO.Location, Location>(referral.Location);
                    referralBO.Location = boLocation;
                }
            }
            if (referral.Location1 != null)
            {
                BO.Location boLocation1 = new BO.Location();
                using (LocationRepository cmp = new LocationRepository(_context))
                {
                    boLocation1 = cmp.Convert<BO.Location, Location>(referral.Location1);
                    referralBO.Location1 = boLocation1;
                }
            }
            if (referral.Doctor != null)
            {
                BO.Doctor boDoctor = new BO.Doctor();
                using (DoctorRepository cmp = new DoctorRepository(_context))
                {
                    boDoctor = cmp.Convert<BO.Doctor, Doctor>(referral.Doctor);
                    referralBO.Doctor = boDoctor;
                }
            }
            if (referral.User != null)
            {
                BO.User boUser = new BO.User();
                using (UserRepository cmp = new UserRepository(_context))
                {
                    boUser = cmp.Convert<BO.User, User>(referral.User);
                    referralBO.User = boUser;
                }
            }
            if (referral.Case != null)
            {
                BO.Case boCase = new BO.Case();
                using (CaseRepository cmp = new CaseRepository(_context))
                {
                    boCase = cmp.Convert<BO.Case, Case>(referral.Case);
                    referralBO.Case = boCase;
                }
            }
            if (referral.Room != null)
            {
                BO.Room boRoom = new BO.Room();
                using (RoomRepository cmp = new RoomRepository(_context))
                {
                    boRoom = cmp.Convert<BO.Room, Room>(referral.Room);
                    referralBO.Room = boRoom;
                }
            }
            return (T)(object)referralBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.Referral referralBO = (BO.Referral)(object)entity;
            var result = referralBO.Validate(referralBO);
            return result;
        }
        #endregion

        #region save
        public override object Save<T>(T entity)
        {
            BO.Referral referralBO = (BO.Referral)(object)entity;
            Referral referralDB = new Referral();

            if (referralBO != null)
            {
                referralDB = _context.Referrals.Where(p => p.Id == referralBO.ID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).FirstOrDefault();
                bool add_referral = false;

                if (referralDB == null && referralBO.ID > 0)
                {
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Referral data.", ErrorLevel = ErrorLevel.Error };
                }
                else if (referralDB == null && referralBO.ID <= 0)
                {
                    referralDB = new Referral();
                    add_referral = true;
                }
                referralDB.CaseId = referralBO.CaseId;
                referralDB.ReferringCompanyId = referralBO.ReferringCompanyId;
                referralDB.ReferredToCompanyId = referralBO.ReferredToCompanyId;
                referralDB.ReferringLocationId = referralBO.ReferringLocationId;
                referralDB.ReferredToLocationId = referralBO.ReferredToLocationId;
                referralDB.ReferringUserId = referralBO.ReferringUserId;
                referralDB.ReferredToDoctorId = referralBO.ReferredToDoctorId;
                referralDB.ReferredToRoomId = referralBO.ReferredToRoomId;
                referralDB.Note = referralBO.Note;
                referralDB.ReferredByEmail = referralBO.ReferredByEmail;
                referralDB.ReferredToEmail = referralBO.ReferredToEmail;
                referralDB.ReferralAccepted = referralBO.ReferralAccepted;

                if (add_referral == true)
                {
                    referralDB = _context.Referrals.Add(referralDB);
                }
                _context.SaveChanges();

            }
            else
            {
                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid details.", ErrorLevel = ErrorLevel.Error };
            }
            _context.SaveChanges();

            ////METHOD TO GENERATE REFFERAL DOCUMENT AND SAVE IN MIDASDOCUMENTS/CASEDOCUMENTS TABLE
            this.GenerateReferralDocument(referralDB.Id);

            referralDB = _context.Referrals.Include("Company")
                                          .Include("Company1")
                                          .Include("Location")
                                          .Include("Location1")
                                          .Include("Doctor")
                                          .Include("Doctor.User")
                                          .Include("User")
                                          .Include("Case")
                                          .Include("Case.Patient2.User")
                                          .Include("Room")
                                          .Where(p => p.Id == referralDB.Id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                              .FirstOrDefault<Referral>();


            try
            {
                if (referralDB.ReferredToDoctorId != null && referralDB.ReferredToLocationId != null && referralDB.ReferredToCompanyId != null)
                {
                    #region Send Email
                    string Message = "Dear " + referralDB.Doctor.User.FirstName + " " + referralDB.Doctor.User.LastName + ",<br><br>Following Patient is being referred to you: " + " " + referralDB.Case.Patient2.User.FirstName + " " + referralDB.Case.Patient2.User.LastName + "<br><br>" + referralDB.Note + "<br><br>" + "By " + referralDB.Company.Name + " - " + referralDB.Location.Name + " - " + referralDB.Doctor.User.FirstName + "<br><br>" + "You can log in with your MIDAS Account to view further detail." + "<br>" + "http://codearray.tk:85/#/account" + "<br><br>" + "Thanks," + "<br>"; /*referralDB.Doctor1.User.FirstName*/
                    BO.Email objEmail = new BO.Email { ToEmail = referralDB.ReferredToEmail, Subject = "Referral-Email", Body = Message };
                    objEmail.SendMail();
                    #endregion
                }
                else if (referralDB.ReferredToDoctorId == null && referralDB.ReferredToLocationId == null && referralDB.ReferredToCompanyId == null)
                {
                    #region Send Email
                    string Message = "Dear " + referralDB.ReferredToEmail + ",<br><br>Following Patient is being referred to you: " + " " + referralDB.Case.Patient2.User.FirstName + " " + referralDB.Case.Patient2.User.LastName + "<br><br>" + referralDB.Note + "<br><br>" + "You will need to log in with your MIDAS account to view further detail. To register with MIDAS, Please register with http://codearray.tk:85/#/account/register-company" + "<br><br>" + "Thanks," + "<br>";/* + referralDB.Doctor1.User.FirstName;*/
                    BO.Email objEmail = new BO.Email { ToEmail = referralDB.ReferredToEmail, Subject = "Referral-Email And Register", Body = Message };
                    objEmail.SendMail();
                    #endregion
                }

            }
            catch (Exception ex) { }

            var res = Convert<BO.Referral, Referral>(referralDB);
            return (object)res;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            var acc = _context.Referrals.Include("Company")
                                        .Include("Company1")
                                        .Include("Location")
                                        .Include("Location1")
                                        .Include("Doctor")
                                        .Include("Doctor.User")
                                        .Include("Doctor.DoctorSpecialities")
                                         .Include("Doctor.DoctorSpecialities.Specialty")
                                        .Include("User")
                                        .Include("Case")
                                        .Include("Room")
                                        .Where(p => p.Id == id
                                         && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                        .FirstOrDefault<Referral>();

            BO.Referral acc_ = Convert<BO.Referral, Referral>(acc);
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            return (object)acc_;
        }
        #endregion

        #region Get By Case Id
        public override object GetByCaseId(int CaseId)
        {
            var acc = _context.Referrals.Include("Company")
                                        .Include("Company1")
                                        .Include("Location")
                                        .Include("Location1")
                                        .Include("Doctor")
                                        .Include("Doctor.User")
                                        .Include("Doctor.DoctorSpecialities")
                                        .Include("Doctor.DoctorSpecialities.Specialty")
                                        .Include("User")
                                        .Include("Case")
                                        .Include("Room")
                                        .Where(p => p.CaseId == CaseId
                                         && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                        .ToList<Referral>();
            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Case Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Referral> lstreferral = new List<BO.Referral>();
                foreach (Referral item in acc)
                {
                    lstreferral.Add(Convert<BO.Referral, Referral>(item));
                }
                return lstreferral;
            }
        }
        #endregion

        #region Get By referringCompanyId
        public override object GetByReferringCompanyId(int id)
        {
            var referralDB = _context.Referrals.Include("Company")
                                               .Include("Company1")
                                               .Include("Location")
                                               .Include("Location1")
                                               .Include("Doctor")
                                               .Include("Doctor.User")
                                               .Include("Doctor.DoctorSpecialities")
                                               .Include("User")
                                               .Include("Case")
                                               .Include("Room")
                                               .Where(p => p.ReferringCompanyId == id
                                                &&(p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .ToList<Referral>();

            List<BO.Referral> boReferral = new List<BO.Referral>();
            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Company ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachDoctor in referralDB)
                {
                    boReferral.Add(Convert<BO.Referral, Referral>(EachDoctor));
                }

            }

            return (object)boReferral;
        }
        #endregion

        #region Get By referredToCompanyId
        public override object GetByReferredToCompanyId(int id)
        {
            var referralDB = _context.Referrals.Include("Company")
                                               .Include("Company1")
                                               .Include("Location")
                                               .Include("Location1")
                                               .Include("Doctor")
                                               .Include("Doctor.User")
                                               .Include("Doctor.DoctorSpecialities")
                                               .Include("User")
                                               .Include("Case")
                                               .Include("Case.Patient2")
                                               .Include("Case.Patient2.User")
                                               .Include("Room")
                                               .Where(p => p.ReferredToCompanyId == id
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                               .ToList<Referral>();

            List<BO.Referral> boReferral = new List<BO.Referral>();
            if (referralDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Company ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {

                foreach (var EachDoctor in referralDB)
                {
                    boReferral.Add(Convert<BO.Referral, Referral>(EachDoctor));
                }

            }

            return (object)boReferral;
        }
        #endregion

        #region Get By ReferredLocationId
        public override object GetByReferringLocationId(int id)
        {
            List<Referral> lstReferral = _context.Referrals.Include("Company")
                                                           .Include("Company1")
                                                           .Include("Location")
                                                           .Include("Location1")
                                                           .Include("Doctor")
                                                           .Include("Doctor.User")
                                                           .Include("Doctor.DoctorSpecialities")
                                                           .Include("User")
                                                           .Include("Case")
                                                           .Include("Room")
                                                           .Where(p => p.ReferringLocationId == id
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .ToList<Referral>();

            if (lstReferral == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Location ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Referral> lstBOReferral = new List<BO.Referral>();
                lstReferral.ForEach(p => lstBOReferral.Add(Convert<BO.Referral, Referral>(p)));

                return lstBOReferral;
            }
        }
        #endregion

        #region Get By ReferredLocationId
        public override object GetByReferringToLocationId(int id)
        {
            List<Referral> lstReferral = _context.Referrals.Include("Company")
                                                           .Include("Company1")
                                                           .Include("Location")
                                                           .Include("Location1")
                                                           .Include("Doctor")
                                                           .Include("Doctor.User")
                                                           .Include("Doctor.DoctorSpecialities")
                                                           .Include("User")
                                                           .Include("Case")
                                                           .Include("Room")
                                                           .Where(p => p.ReferredToLocationId == id
                                                           && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                           .ToList<Referral>();

            if (lstReferral == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No visit found for this Location ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Referral> lstBOReferral = new List<BO.Referral>();
                lstReferral.ForEach(p => lstBOReferral.Add(Convert<BO.Referral, Referral>(p)));

                return lstBOReferral;
            }
        }
        #endregion

        #region GetByReferringUserId
        public override object GetByReferringUserId(int id)
        {
            List<Referral> lstReferral = _context.Referrals.Include("Location")
                                                            .Include("Location1")
                                                            .Include("Company")
                                                            .Include("Company1")
                                                            .Include("Doctor")
                                                            .Include("Doctor.User")
                                                            .Include("Doctor.DoctorSpecialities")
                                                            .Include("Doctor.DoctorSpecialities.Specialty")
                                                            .Include("User")
                                                            .Include("Case")
                                                            .Include("Room")
                                                            .Where(p => p.ReferringUserId == id
                                                             && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .ToList<Referral>();

            if (lstReferral == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No Referral found for this User ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Referral> lstBOReferral = new List<BO.Referral>();
                lstReferral.ForEach(p => lstBOReferral.Add(Convert<BO.Referral, Referral>(p)));

                return lstBOReferral;
            }
        }
        #endregion

        #region GetByReferredToDoctorId
        public override object GetByReferredToDoctorId(int id)
        {
            List<Referral> lstReferral = _context.Referrals.Include("Location")
                                                            .Include("Location1")
                                                            .Include("Company")
                                                            .Include("Company1")
                                                            .Include("Doctor")
                                                            .Include("Doctor.User")
                                                            .Include("Doctor.DoctorSpecialities")
                                                            .Include("Doctor.DoctorSpecialities.Specialty")
                                                            .Include("User")
                                                            .Include("Case")
                                                            .Include("Case.Patient2")
                                                            .Include("Case.Patient2.User")
                                                            .Include("Room")
                                                            .Where(p => p.ReferredToDoctorId == id
                                                             && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .ToList<Referral>();

            if (lstReferral == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No Referral found for this Doctor ID.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Referral> lstBOReferral = new List<BO.Referral>();
                lstReferral.ForEach(p => lstBOReferral.Add(Convert<BO.Referral, Referral>(p)));

                return lstBOReferral;
            }
        }
        #endregion

        #region Delete By ID
        public override object Delete(int id)
        {
            var acc = _context.Referrals.Where(p => p.Id == id
                                                         && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                         .FirstOrDefault<Referral>();
            if (acc != null)
            {
                acc.IsDeleted = true;
                _context.SaveChanges();
            }
            else if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.Referral, Referral>(acc);
            return (object)res;
        }
        #endregion

        public string GetTemplateDocument(string templateType)
        {
            TemplateTypeRepository templateTypeRepo = new TemplateTypeRepository(_context);
            BO.Common.TemplateType templateData = (BO.Common.TemplateType)templateTypeRepo.Get(templateType);

            return templateData.TemplateText;
        }

        public override object GenerateReferralDocument(int id)
        {
            HtmlToPdf htmlPDF = new HtmlToPdf();
            string path = string.Empty;
            string pdfText = GetTemplateDocument(Constants.ReferralType);
            var acc = _context.Referrals.Include("Case")
                                             .Include("Case.Patient2")
                                             .Include("Case.Patient2.User")
                                             .Include("Doctor")
                                             .Include("Doctor.User")
                                             .Include("Company")
                                             .Include("Company1")
                                             .Where(p => p.Id == id).FirstOrDefault();
            if (acc != null)
            {
                using (var dbContextTransaction = _context.Database.BeginTransaction())
                {
                    try
                    {
                        pdfText = pdfText.Replace("{{CompanyName}}", acc.Company.Name)
                                         .Replace("{{PatientName}}", acc.Case.Patient2.User.FirstName + " " + acc.Case.Patient2.User.LastName)
                                         .Replace("{{CreateDate}}", acc.CreateDate.ToShortDateString())
                                         .Replace("{{ReferredToDoctor}}", acc.Doctor.User.FirstName + " " + acc.Doctor.User.LastName)
                                         .Replace("{{Note}}", acc.Note);

                        path = ConfigurationManager.AppSettings.Get("LOCAL_PATH") + "\\app_data\\uploads\\COMPANY_"+ acc.Company.id + "\\case_" + acc.Case.Id;
                        htmlPDF.OpenHTML(pdfText);
                        if (!Directory.Exists(path)) Directory.CreateDirectory(path);
                        htmlPDF.SavePDF(@path + "\\referral.pdf");

                        MidasDocument midasdoc = _context.MidasDocuments.Add(new MidasDocument()
                        {
                            ObjectType = Constants.ReferralType,
                            ObjectId = id,
                            DocumentName = "Referral.pdf",
                            DocumentPath = ConfigurationManager.AppSettings.Get("BLOB_SERVER") + path.ToString(),
                        });
                        _context.Entry(midasdoc).State = System.Data.Entity.EntityState.Added;
                        _context.SaveChanges();

                        ReferralDocument referralDoc = _context.ReferralDocuments.Add(new ReferralDocument()
                        {
                            MidasDocumentId = midasdoc.Id,
                            ReferralId = id,
                            DocumentName = "Referral.pdf"
                        });
                        _context.Entry(referralDoc).State = System.Data.Entity.EntityState.Added;
                        _context.SaveChanges();

                        dbContextTransaction.Commit();
                    }
                    catch (Exception)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { ErrorMessage = "Error occurred in document upload/save.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                    }
                }
            }
            else
                return new BO.ErrorObject { ErrorMessage = "No record found for referral id", errorObject = "", ErrorLevel = ErrorLevel.Error };

            return acc;
        }


        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }

}
