CREATE TABLE [dbo].[MailTemplates](
	[TemplateID] [int] IDENTITY(1,1) NOT NULL,
	[TemplateName] [nvarchar](50) NULL,
	[EmailSubject] [nvarchar](50) NULL,
	[EmailBody] [nvarchar](500) NULL,
 CONSTRAINT [PK_MailTemplates] PRIMARY KEY CLUSTERED 
(
	[TemplateID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO



--insert into [dbo].[MailTemplates] values('CaseCreated','Alert Message From GBX MIDAS','Dear {0} <br><br>Case is created for patient id {1}.');

GO
--insert into [dbo].[MailTemplates] values('AssociatePatientWithAttorneyCompany','User associated','Dear  {0}(attorney) ,<br><br>New patient has been associated with company.<br>PatientId:{1} PatientEmail:{2} .<br><br> Your user name is:- {3}<br><br> Please confirm your account by clicking below link in order to use.<br><br><b>{4}</b><br><br>Thanks;');


Go


-- insert into [MIDASGBX].[dbo].[MailTemplates] values('PrefMedicalProviderCreated','Alert Message From GBX MIDAS','Dear {0},<br><br>Thanks for registering with us.<br><br> Your user name is:- {1}<br><br> Please confirm your account by clicking below link in order to use.<br><br><b>{2}</b><br><br>Thanks');

-- Go

-- insert into [MIDASGBX].[dbo].[MailTemplates] values('PrefMedicalProviderUpdated','Alert Message From GBX MIDAS','Dear {0},<br><br> Your MedicalProvider details are updated.<br><br> Your user name is:- {1}<br><br> Please click on below link to login to MIDAS and see the medical details.<br><br><b>{2}</b><br><br>Thanks');

--  Go

--  insert into [MIDASGBX].[dbo].[MailTemplates] values('MedicalProviderTemplate','Alert Message From GBX MIDAS','Dear {0},<br><br>case have been created by {1}<Attorney> and assigned to you <br><br> Please click on below link to login to MIDAS and see the case details.<br><br><b>{2}</b><br><br>Thanks');

--  Go


--  insert into [MIDASGBX].[dbo].[MailTemplates] values('AttorneyTemplate','Alert Message From GBX MIDAS','Dear {0},<br><br>case have been created by {1}<Medical Provider> and assigned to you <br><br> Please click on below link to login to MIDAS and see the case details.<br><br><b>{2}</b><br><br>Thanks');


--Go

--  insert into [MIDASGBX].[dbo].[MailTemplates] 
--  values
--  ('PatientCaseTemplateByMedicalProvider','Alert Message From GBX MIDAS','Dear {0},<br><br>case have been created by {1}<Medical Provider> and assigned to {2}attorney.<br><br> Please click on below link to login to MIDAS and see the case details.<br><br><b>{3}</b><br><br>Thanks');

--  Go

-- insert into [MIDASGBX].[dbo].[MailTemplates] 
--  values
--  ('PatientCaseTemplateByAttorney','Alert Message From GBX MIDAS','Dear {0},<br><br>case have been created by {1}<Attorney> and assigned to {2}<Medical Provider> .<br><br> Please click on below link to login to MIDAS and see the case details.<br><br><b>{3}</b><br><br>Thanks');

--Go

-- insert into [MIDASGBX].[dbo].[MailTemplates] values('MedicalProviderTemplateUpdate','Alert Message From GBX MIDAS','Dear {0},<br><br>case have been updated by {1}<Attorney> <br><br> Please click on below link to login to MIDAS and see the case details.<br><br><b>{2}</b><br><br>Thanks');

-- Go

--  insert into [MIDASGBX].[dbo].[MailTemplates] values('AttorneyTemplateUpdate','Alert Message From GBX MIDAS','Dear {0},<br><br>case have been updated by {1}<Medical Provider>  <br><br> Please click on below link to login to MIDAS and see the case details.<br><br><b>{2}</b><br><br>Thanks');

--  Go

--  insert into [MIDASGBX].[dbo].[MailTemplates] 
--  values
--  ('PatientCaseTemplateByMedicalProviderUpdate','Alert Message From GBX MIDAS','Dear {0},<br><br>case have been updated by {1}<Medical Provider> and assigned to {2}attorney.<br><br> Please click on below link to login to MIDAS and see the case details.<br><br><b>{3}</b><br><br>Thanks');

--  Go

-- insert into [MIDASGBX].[dbo].[MailTemplates] 
--  values
--  ('PatientCaseTemplateByAttorneyUpdate','Alert Message From GBX MIDAS','Dear {0},<br><br>case have been updated by {1}<Attorney> and assigned to {2}<Medical Provider> .<br><br> Please click on below link to login to MIDAS and see the case details.<br><br><b>{3}</b><br><br>Thanks');

--  Go
