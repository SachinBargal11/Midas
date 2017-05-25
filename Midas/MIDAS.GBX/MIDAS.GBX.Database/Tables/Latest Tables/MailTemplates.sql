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