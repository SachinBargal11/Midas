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
            referralBO.ReferredToSpecialtyId = referral.ReferredToSpecialtyId;
            referralBO.ReferredToRoomTestId = referral.ReferredToRoomTestId;
            referralBO.Note = referral.Note;
            referralBO.ReferredByEmail = referral.ReferredByEmail;
            referralBO.ReferredToEmail = referral.ReferredToEmail;
            referralBO.ReferralAccepted = referral.ReferralAccepted;
            referralBO.FirstName = referral.FirstName;
            referralBO.LastName = referral.LastName;
            referralBO.CellPhone = referral.CellPhone;
            referralBO.IsDeleted = referral.IsDeleted;
            referralBO.CreateByUserID = referral.CreateByUserID;
            referralBO.UpdateByUserID = referral.UpdateByUserID;

            if (referral.Company != null)
            {
                if (referral.Company.IsDeleted.HasValue == false || (referral.Company.IsDeleted.HasValue == true && referral.Company.IsDeleted.Value == false))
                {
                    BO.Company boCompany = new BO.Company();
                    using (CompanyRepository cmp = new CompanyRepository(_context))
                    {
                        boCompany = cmp.Convert<BO.Company, Company>(referral.Company);
                        referralBO.Company = boCompany;
                    }
                }
            }
            if (referral.Company1 != null)
            {
                if (referral.Company1.IsDeleted.HasValue == false || (referral.Company1.IsDeleted.HasValue == true && referral.Company1.IsDeleted.Value == false))
                {
                    BO.Company boCompany1 = new BO.Company();
                    using (CompanyRepository cmp = new CompanyRepository(_context))
                    {
                        boCompany1 = cmp.Convert<BO.Company, Company>(referral.Company1);
                        referralBO.Company1 = boCompany1;
                    }
                }
            }
            if (referral.Location != null)
            {
                if (referral.Location.IsDeleted.HasValue == false || (referral.Location.IsDeleted.HasValue == true && referral.Location.IsDeleted.Value == false))
                {
                    BO.Location boLocation = new BO.Location();
                    using (LocationRepository cmp = new LocationRepository(_context))
                    {
                        boLocation = cmp.Convert<BO.Location, Location>(referral.Location);
                        referralBO.Location = boLocation;
                    }
                }
            }
            if (referral.Location1 != null)
            {
                if (referral.Location1.IsDeleted.HasValue == false || (referral.Location1.IsDeleted.HasValue == true && referral.Location1.IsDeleted.Value == false))
                {
                    BO.Location boLocation1 = new BO.Location();
                    using (LocationRepository cmp = new LocationRepository(_context))
                    {
                        boLocation1 = cmp.Convert<BO.Location, Location>(referral.Location1);
                        referralBO.Location1 = boLocation1;
                    }
                }
            }
            if (referral.Doctor != null)
            {
                if (referral.Doctor.IsDeleted.HasValue == false || (referral.Doctor.IsDeleted.HasValue == true && referral.Doctor.IsDeleted.Value == false))
                {
                    BO.Doctor boDoctor = new BO.Doctor();
                    using (DoctorRepository cmp = new DoctorRepository(_context))
                    {
                        boDoctor = cmp.Convert<BO.Doctor, Doctor>(referral.Doctor);
                        referralBO.Doctor = boDoctor;
                    }
                }
            }
            if (referral.User != null)
            {
                if (referral.User.IsDeleted.HasValue == false || (referral.User.IsDeleted.HasValue == true && referral.User.IsDeleted.Value == false))
                {
                    BO.User boUser = new BO.User();
                    using (UserRepository cmp = new UserRepository(_context))
                    {
                        boUser = cmp.Convert<BO.User, User>(referral.User);
                        referralBO.User = boUser;
                    }
                }
            }
            if (referral.Case != null)
            {
                if (referral.Case.IsDeleted.HasValue == false || (referral.Case.IsDeleted.HasValue == true && referral.Case.IsDeleted.Value == false))
                {
                    BO.Case boCase = new BO.Case();
                    using (CaseRepository cmp = new CaseRepository(_context))
                    {
                        boCase = cmp.Convert<BO.Case, Case>(referral.Case);
                        referralBO.Case = boCase;
                    }
                }
            }
            if (referral.Room != null)
            {
                if (referral.Room.IsDeleted.HasValue == false || (referral.Room.IsDeleted.HasValue == true && referral.Room.IsDeleted.Value == false))
                {
                    BO.Room boRoom = new BO.Room();
                    using (RoomRepository cmp = new RoomRepository(_context))
                    {
                        boRoom = cmp.Convert<BO.Room, Room>(referral.Room);
                        referralBO.Room = boRoom;
                    }
                }
            }

            if (referral.RoomTest != null)
            {
                if (referral.RoomTest.IsDeleted.HasValue == false || (referral.RoomTest.IsDeleted.HasValue == true && referral.RoomTest.IsDeleted.Value == false))
                {
                    BO.RoomTest boRoomTest = new BO.RoomTest();
                    using (RoomTestRepository cmp = new RoomTestRepository(_context))
                    {
                        boRoomTest = cmp.Convert<BO.RoomTest, RoomTest>(referral.RoomTest);
                        referralBO.RoomTest = boRoomTest;
                    }
                }
            }
            if (referral.Specialty != null)
            {
                if (referral.Specialty.IsDeleted.HasValue == false || (referral.Specialty.IsDeleted.HasValue == true && referral.Specialty.IsDeleted.Value == false))
                {
                    BO.Specialty boSpecialty = new BO.Specialty();
                    using (SpecialityRepository cmp = new SpecialityRepository(_context))
                    {
                        boSpecialty = cmp.Convert<BO.Specialty, Specialty>(referral.Specialty);
                        referralBO.Specialty = boSpecialty;
                    }
                }
            }

            if (referral.ReferralDocuments != null)
            {
                List<BO.ReferralDocument> boReferralDocument = new List<BO.ReferralDocument>();
                
                foreach (var eachReferralDocument in referral.ReferralDocuments)
                {
                    if (eachReferralDocument.IsDeleted.HasValue == false || (eachReferralDocument.IsDeleted.HasValue == true && eachReferralDocument.IsDeleted.Value == false))
                    {
                        BO.ReferralDocument referralDocument = new BO.ReferralDocument();

                        referralDocument.ID = eachReferralDocument.Id;
                        referralDocument.ReferralId = eachReferralDocument.ReferralId;
                        referralDocument.DocumentName = eachReferralDocument.DocumentName;
                        referralDocument.MidasDocumentId = eachReferralDocument.MidasDocumentId;
                        referralDocument.IsDeleted = eachReferralDocument.IsDeleted;
                        referralDocument.UpdateByUserID = eachReferralDocument.UpdateUserId;
                        referralDocument.CreateByUserID = (int)(eachReferralDocument.CreateUserId.HasValue == true ? eachReferralDocument.CreateUserId.Value : 0);

                        if (eachReferralDocument.MidasDocument != null)
                        {
                            BO.MidasDocument boMidasDocument = new BO.MidasDocument();

                            boMidasDocument.ID = eachReferralDocument.Id;
                            boMidasDocument.ObjectType = eachReferralDocument.MidasDocument.ObjectType;
                            boMidasDocument.ObjectId = eachReferralDocument.MidasDocument.ObjectId;
                            boMidasDocument.DocumentPath = eachReferralDocument.MidasDocument.DocumentPath;
                            boMidasDocument.DocumentName = eachReferralDocument.MidasDocument.DocumentName;
                            boMidasDocument.IsDeleted = eachReferralDocument.MidasDocument.IsDeleted;
                            boMidasDocument.UpdateByUserID = eachReferralDocument.MidasDocument.UpdateUserId;
                            boMidasDocument.CreateByUserID = (int)(eachReferralDocument.MidasDocument.CreateUserId.HasValue == true ? eachReferralDocument.MidasDocument.CreateUserId.Value : 0);

                            referralDocument.MidasDocument = boMidasDocument;
                        }


                        boReferralDocument.Add(referralDocument);
                    }
                }

                referralBO.ReferralDocument = boReferralDocument;                
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
                if (referralBO.ReferredToCompanyId == null && referralBO.ReferredToEmail == null)
                {
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass ReferredToCompanyId or ReferredToEmail.", ErrorLevel = ErrorLevel.Error };
                }

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
                referralDB.ReferredToSpecialtyId = referralBO.ReferredToSpecialtyId;
                referralDB.ReferredToRoomTestId = referralBO.ReferredToRoomTestId;
                referralDB.Note = referralBO.Note;
                referralDB.ReferredByEmail = referralBO.ReferredByEmail;
                referralDB.ReferredToEmail = referralBO.ReferredToEmail;
                referralDB.ReferralAccepted = referralBO.ReferralAccepted;
                referralDB.FirstName = referralBO.FirstName;
                referralDB.LastName = referralBO.LastName;
                referralDB.CellPhone = referralBO.CellPhone;

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
                                          .Include("Case.CompanyCaseConsentApprovals")
                                          .Include("Case.CaseCompanyConsentDocuments")
                                          .Include("Case.CaseCompanyConsentDocuments.MidasDocument")
                                          .Include("ReferralDocuments")
                                          .Include("ReferralDocuments.MidasDocument")
                                          .Include("Room")
                                          .Include("RoomTest")
                                          .Include("Specialty")
                                          .Where(p => p.Id == referralDB.Id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                              .FirstOrDefault<Referral>();


            try
            {
                if (referralDB.ReferredToCompanyId != null && referralDB.ReferredToDoctorId == null && referralDB.ReferredToRoomId == null)
                {
                    #region Send Email
                    string Message = "Dear " + "" + " " + "" + ",<br><br>Following Patient is being referred to you: " + " " + referralDB.Case.Patient2.User.FirstName + " " + referralDB.Case.Patient2.User.LastName + "<br><br>" + referralDB.Note + "<br><br>" + "By " + referralDB.Company.Name + " - " + ((referralDB.Location != null) ? referralDB.Location.Name : "") + " - " + "" + "<br><br>" + "You can log in with your MIDAS Account to view further detail." + "<br>" + "http://codearray.tk:85/#/account" + "<br><br>" + "Thanks," + "<br>";
                    BO.Email objEmail = new BO.Email { ToEmail = referralDB.ReferredToEmail, Subject = "Referral-Email", Body = Message };
                    objEmail.SendMail();
                    #endregion
                }
                else if (referralDB.ReferredToCompanyId != null && referralDB.ReferredToDoctorId != null)
                {
                    #region Send Email
                    string Message = "Dear " + referralDB.Doctor.User.FirstName + " " + referralDB.Doctor.User.LastName + ",<br><br>Following Patient is being referred to you: " + " " + referralDB.Case.Patient2.User.FirstName + " " + referralDB.Case.Patient2.User.LastName + "<br><br>" + referralDB.Note + "<br><br>" + "By " + referralDB.Company.Name + " - " + ((referralDB.Location != null) ? referralDB.Location.Name : "") + " - " + referralDB.Doctor.User.FirstName + "<br><br>" + "You can log in with your MIDAS Account to view further detail." + "<br>" + "http://codearray.tk:85/#/account" + "<br><br>" + "Thanks," + "<br>";
                    BO.Email objEmail = new BO.Email { ToEmail = referralDB.ReferredToEmail, Subject = "Referral-Email", Body = Message };
                    objEmail.SendMail();
                    #endregion
                }
                else if (referralDB.ReferredToCompanyId != null &&  referralDB.ReferredToRoomId != null)
                {
                    #region Send Email
                    string Message = "Dear " + "" + " " + "" + ",<br><br>Following Patient is being referred to you: " + " " + referralDB.Case.Patient2.User.FirstName + " " + referralDB.Case.Patient2.User.LastName + "<br><br>" + referralDB.Note + "<br><br>" + "By " + referralDB.Company.Name + " - " + ((referralDB.Location != null) ? referralDB.Location.Name : "") + " - " + "" + "<br><br>" + "You can log in with your MIDAS Account to view further detail." + "<br>" + "http://codearray.tk:85/#/account" + "<br><br>" + "Thanks," + "<br>";
                    BO.Email objEmail = new BO.Email { ToEmail = referralDB.ReferredToEmail, Subject = "Referral-Email", Body = Message };
                    objEmail.SendMail();
                    #endregion
                }
                else if (referralDB.ReferredToCompanyId == null && referralDB.ReferredToDoctorId == null && referralDB.ReferredToRoomId == null)
                {
                    #region Send Email
                    string Message = "Dear " + referralDB.FirstName + " " + referralDB.LastName + ",<br><br>Following Patient is being referred to you: " + " " + referralDB.Case.Patient2.User.FirstName + " " + referralDB.Case.Patient2.User.LastName + "<br><br>" + referralDB.Note + "<br><br>" + "You will need to log in with your MIDAS account to view further detail. To register with MIDAS, Please register with http://codearray.tk:85/#/account/register-company?type=refer&UserName=" + referralDB.ReferredToEmail + "" + "<br><br>" + "Thanks," + "<br>";
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
                                        .Include("Case.Patient2")
                                        .Include("Case.Patient2.User")
                                        .Include("Case.CompanyCaseConsentApprovals")
                                        .Include("Case.CaseCompanyConsentDocuments")
                                        .Include("Case.CaseCompanyConsentDocuments.MidasDocument")
                                        .Include("ReferralDocuments")
                                        .Include("ReferralDocuments.MidasDocument")
                                        .Include("Room")
                                        .Include("RoomTest")
                                        .Include("Specialty")
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
                                        .Include("Case.Patient2")
                                        .Include("Case.Patient2.User")
                                        .Include("Case.CompanyCaseConsentApprovals")
                                        .Include("Case.CaseCompanyConsentDocuments")
                                        .Include("Case.CaseCompanyConsentDocuments.MidasDocument")
                                        .Include("ReferralDocuments")
                                        .Include("ReferralDocuments.MidasDocument")
                                        .Include("Room")
                                        .Include("RoomTest")
                                        .Include("Specialty")
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
                                               .Include("Case.Patient2")
                                               .Include("Case.Patient2.User")
                                               .Include("Case.CompanyCaseConsentApprovals")
                                               .Include("Case.CaseCompanyConsentDocuments")
                                               .Include("Case.CaseCompanyConsentDocuments.MidasDocument")
                                               .Include("ReferralDocuments")
                                               .Include("ReferralDocuments.MidasDocument")
                                               .Include("Room")
                                               .Include("RoomTest")
                                               .Include("Specialty")
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
                                               .Include("Case.CompanyCaseConsentApprovals")
                                               .Include("Case.CaseCompanyConsentDocuments")
                                               .Include("Case.CaseCompanyConsentDocuments.MidasDocument")
                                               .Include("ReferralDocuments")
                                               .Include("ReferralDocuments.MidasDocument")
                                               .Include("Room")
                                               .Include("RoomTest")
                                               .Include("Specialty")
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
                                                            .Include("Case.Patient2")
                                                            .Include("Case.Patient2.User")
                                                            .Include("Case.CompanyCaseConsentApprovals")
                                                            .Include("Case.CaseCompanyConsentDocuments")
                                                            .Include("Case.CaseCompanyConsentDocuments.MidasDocument")
                                                            .Include("ReferralDocuments")
                                                            .Include("ReferralDocuments.MidasDocument")
                                                            .Include("Room")
                                                            .Include("RoomTest")
                                                            .Include("Specialty")
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
                                                           .Include("Case.Patient2")
                                                           .Include("Case.Patient2.User")
                                                           .Include("Case.CompanyCaseConsentApprovals")
                                                           .Include("Case.CaseCompanyConsentDocuments")
                                                           .Include("Case.CaseCompanyConsentDocuments.MidasDocument")
                                                           .Include("ReferralDocuments")
                                                           .Include("ReferralDocuments.MidasDocument")
                                                           .Include("Room")
                                                           .Include("RoomTest")
                                                           .Include("Specialty")
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
                                                            .Include("Case.Patient2")
                                                            .Include("Case.Patient2.User")
                                                            .Include("Case.CompanyCaseConsentApprovals")
                                                            .Include("Case.CaseCompanyConsentDocuments")
                                                            .Include("Case.CaseCompanyConsentDocuments.MidasDocument")
                                                            .Include("ReferralDocuments")
                                                            .Include("ReferralDocuments.MidasDocument")
                                                            .Include("Room")
                                                            .Include("RoomTest")
                                                            .Include("Specialty")
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
                                                            .Include("Case.CompanyCaseConsentApprovals")
                                                            .Include("Case.CaseCompanyConsentDocuments")
                                                            .Include("Case.CaseCompanyConsentDocuments.MidasDocument")
                                                            .Include("ReferralDocuments")
                                                            .Include("ReferralDocuments.MidasDocument")
                                                            .Include("Room")
                                                            .Include("RoomTest")
                                                            .Include("Specialty")
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
                                             .Where(p => p.Id == id).FirstOrDefault();
            if (acc != null)
            {
                using (var dbContextTransaction = _context.Database.BeginTransaction())
                {
                    try
                    {
                        pdfText = pdfText.Replace("{{PatientName}}", acc.Case.Patient2.User.FirstName + " " + acc.Case.Patient2.User.LastName)
                                         .Replace("{{CreateDate}}", acc.CreateDate.ToShortDateString())
                                         .Replace("{{ReferredToDoctor}}", acc.Doctor != null ? (acc.Doctor.User.FirstName + " " + acc.Doctor.User.LastName) : "")
                                         .Replace("{{Note}}", acc.Note)
                                         .Replace("{{CompanyName}}", acc.Company.Name);

                        path = ConfigurationManager.AppSettings.Get("LOCAL_PATH") + "\\app_data\\uploads\\case_" + acc.Case.Id;
                        htmlPDF.OpenHTML(pdfText);
                        if (!Directory.Exists(path)) Directory.CreateDirectory(ConfigurationManager.AppSettings.Get("LOCAL_PATH") + "\\app_data\\uploads\\case_" + acc.Case.Id);
                        htmlPDF.SavePDF(@path + "\\Referral_Case_" + acc.Case.Id + ".pdf");

                        MidasDocument midasdoc = _context.MidasDocuments.Add(new MidasDocument()
                        {
                            ObjectType = Constants.ReferralType,
                            ObjectId = id,
                            DocumentName = "Referral_Case_" + acc.Case.Id + ".pdf",
                            DocumentPath = ConfigurationManager.AppSettings.Get("BLOB_PATH") + "/app_data/uploads/case_" + acc.Case.Id,
                            CreateDate = DateTime.UtcNow
                        });
                        _context.Entry(midasdoc).State = System.Data.Entity.EntityState.Added;
                        _context.SaveChanges();

                        ReferralDocument referralDoc = _context.ReferralDocuments.Add(new ReferralDocument()
                        {
                            MidasDocumentId = midasdoc.Id,
                            ReferralId = id,
                            DocumentName = "Referral_Case_" + acc.Case.Id + ".pdf",
                            CreateDate = DateTime.UtcNow
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
