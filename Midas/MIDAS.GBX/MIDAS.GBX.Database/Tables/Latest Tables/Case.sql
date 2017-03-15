CREATE TABLE [dbo].[Case](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PatientId] [int] NOT NULL,
	[CaseName] [nvarchar](50) NULL,
	[CaseTypeId] [TINYINT] NULL,
	--[DateOfInjury] [datetime2](7) NOT NULL,
	[LocationId] [int] NOT NULL,
	[PatientEmpInfoId] [int] NULL,
	
	--[PatientInsuranceInfoId] [int] NULL,
	--[CaseInsuranceMappingId] [INT] NULL,

	--[PatientAccidentInfoId] [int] NULL,
	--[RefferingOfficeId] [int] NULL,
	[CarrierCaseNo] [nvarchar](50) NULL,
	[Transportation] [bit] NOT NULL DEFAULT 0,
	[CaseStatusId] [TINYINT] NULL,
	[AttorneyId] [int] NULL,
	[IsConsentFormSigned] BIT NOT NULL DEFAULT 0, 

	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

--ALTER TABLE [dbo].[Case] ADD  DEFAULT ((0)) FOR [Transportation]
GO

ALTER TABLE [dbo].[Case]  WITH CHECK ADD  CONSTRAINT [FK_Case_Location_LocationID] FOREIGN KEY([LocationId])
	REFERENCES [dbo].[Location] ([id])
GO

ALTER TABLE [dbo].[Case] CHECK CONSTRAINT [FK_Case_Location_LocationID]
GO

ALTER TABLE [dbo].[Case]  WITH CHECK ADD  CONSTRAINT [FK_Case_Patient2_PatientId] FOREIGN KEY([PatientId])
	REFERENCES [dbo].[Patient2] ([Id])
GO

ALTER TABLE [dbo].[Case] CHECK CONSTRAINT [FK_Case_Patient2_PatientId]
GO

--ALTER TABLE [dbo].[Case]  WITH CHECK ADD  CONSTRAINT [FK_Case_PatientAccidentInfo_PatientAccidentInfoId] FOREIGN KEY([PatientAccidentInfoId])
--	REFERENCES [dbo].[PatientAccidentInfo] ([Id])
--GO

--ALTER TABLE [dbo].[Case] CHECK CONSTRAINT [FK_Case_PatientAccidentInfo_PatientAccidentInfoId]
--GO

ALTER TABLE [dbo].[Case]  WITH CHECK ADD  CONSTRAINT [FK_Case_PatientEmpInfo_PatientEmpInfoId] FOREIGN KEY([PatientEmpInfoId])
	REFERENCES [dbo].[PatientEmpInfo] ([Id])
GO

ALTER TABLE [dbo].[Case] CHECK CONSTRAINT [FK_Case_PatientEmpInfo_PatientEmpInfoId]
GO

--ALTER TABLE [dbo].[Case] ALTER COLUMN [CaseTypeId] [TINYINT] NULL 
GO

ALTER TABLE [dbo].[Case]  WITH CHECK ADD  CONSTRAINT [FK_Case_CaseType_CaseTypeId] FOREIGN KEY([CaseTypeId])
	REFERENCES [dbo].[CaseType] ([Id])
GO

ALTER TABLE [dbo].[Case] CHECK CONSTRAINT [FK_Case_CaseType_CaseTypeId]
GO

--ALTER TABLE [dbo].[Case] ALTER COLUMN [CaseStatusId] [TINYINT] NULL 
GO

ALTER TABLE [dbo].[Case]  WITH CHECK ADD  CONSTRAINT [FK_Case_CaseStatus_CaseStatusId] FOREIGN KEY([CaseStatusId])
	REFERENCES [dbo].[CaseStatus] ([Id])
GO

ALTER TABLE [dbo].[Case] CHECK CONSTRAINT [FK_Case_CaseStatus_CaseStatusId]
GO

--ALTER TABLE [dbo].[Case] ADD [IsConsentFormSigned] BIT NOT NULL DEFAULT 0
--GO
--ALTER TABLE [dbo].[Case] DROP [LocationId]
/*
	Create a new table CaseCompanyLocationMapping, once the consent form is given then the entry is made into CaseCompanyLocationMapping table to make the company view the case.
*/
--GO