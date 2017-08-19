IF NOT EXISTS
(
	SELECT	1 
	FROM	INFORMATION_SCHEMA.TABLES
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Patient'
)
BEGIN
    CREATE TABLE [dbo].[Patient]
    (
	    [Id] [int] NOT NULL,
	    [SSN] [nvarchar](20) NOT NULL,
	    [Weight] [decimal](5, 2) NULL,
	    [Height] [decimal](5, 2) NULL,
	    [MaritalStatusId] [tinyint] NULL,
	    [DateOfFirstTreatment] [datetime2](7) NULL,
        [ParentOrGuardianName] [NVARCHAR](256) NULL,
        [EmergencyContactName] [NVARCHAR](256) NULL,
        [EmergencyContactPhone] [NVARCHAR](256) NULL,
        [LegallyMarried] [BIT] NULL DEFAULT 0,
        [SpouseName] [NVARCHAR](256) NULL,

	    [IsDeleted] [bit] NULL DEFAULT ((0)),
	    [CreateByUserID] [int] NOT NULL,
	    [CreateDate] [datetime2](7) NOT NULL,
	    [UpdateByUserID] [int] NULL,
	    [UpdateDate] [datetime2](7) NULL,
        CONSTRAINT [PK_Patient] PRIMARY KEY CLUSTERED ([Id] ASC )
    ) ON [PRIMARY]
END
ELSE
BEGIN
	PRINT 'Table [dbo].[Patient] already exists in database: ' + DB_NAME()
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Patient'
	AND		CONSTRAINT_NAME = 'FK_Patient_User_id'
)
BEGIN
	ALTER TABLE [dbo].[Patient] 
        DROP CONSTRAINT [FK_Patient_User_id]
END

ALTER TABLE [dbo].[Patient]  WITH CHECK ADD  CONSTRAINT [FK_Patient_User_id] FOREIGN KEY([Id])
	REFERENCES [dbo].[User] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Patient'
	AND		CONSTRAINT_NAME = 'FK_Patient_MaritalStatusId'
)
BEGIN
	ALTER TABLE [dbo].[Patient] 
        DROP CONSTRAINT [FK_Patient_MaritalStatusId]
END

ALTER TABLE [dbo].[Patient]  WITH CHECK ADD  CONSTRAINT [FK_Patient_MaritalStatusId] FOREIGN KEY([MaritalStatusId])
	REFERENCES [dbo].[MaritalStatus] ([Id])
GO

--CREATE TABLE [dbo].[Patient](
--	[Id] [INT] NOT NULL,
--	[SSN] [NVARCHAR](20) NOT NULL, 
--	[CompanyId] [INT] NULL,
--	[Weight] [DECIMAL](5, 2) NULL, 
--	[Height] [DECIMAL](5, 2) NULL,
--	[MaritalStatusId] [TINYINT] NULL,
--	[DateOfFirstTreatment] [DATETIME2](7) NULL,

--	[IsDeleted] [bit] NULL DEFAULT (0),
--	[CreateByUserID] [int] NOT NULL,
--	[CreateDate] [datetime2](7) NOT NULL,
--	[UpdateByUserID] [int] NULL,
--	[UpdateDate] [datetime2](7) NULL, 
--    CONSTRAINT [PK_Patient] PRIMARY KEY ([Id]), 
--	CONSTRAINT [UK_Patient_SSN] UNIQUE ([SSN])
--) ON [PRIMARY]

--GO

--ALTER TABLE [dbo].[Patient]  WITH CHECK ADD  CONSTRAINT [FK_Patient_User_id] FOREIGN KEY([Id])
--	REFERENCES [dbo].[User] ([Id])
--GO

--ALTER TABLE [dbo].[Patient] CHECK CONSTRAINT [FK_Patient_User_id]
--GO

--ALTER TABLE [dbo].[Patient]  WITH CHECK ADD  CONSTRAINT [FK_Patient_Company_CompanyId] FOREIGN KEY([CompanyId])
--	REFERENCES [dbo].[Company] ([Id])
--GO

--ALTER TABLE [dbo].[Patient] CHECK CONSTRAINT [FK_Patient_Company_CompanyId]
--GO

--ALTER TABLE [dbo].[Patient]  WITH CHECK ADD  CONSTRAINT [FK_Patient_Location_LocationID] FOREIGN KEY([LocationID])
--REFERENCES [dbo].[Location] ([Id])
--GO

--ALTER TABLE [dbo].[Patient] CHECK CONSTRAINT [FK_Patient_Location]
--GO

--ALTER TABLE [dbo].[Patient]  WITH CHECK ADD  CONSTRAINT [FK_Patient_MaritalStatusId] FOREIGN KEY([MaritalStatusId])
--	REFERENCES [dbo].[MaritalStatus] ([Id])
--GO

--ALTER TABLE [dbo].[Patient] CHECK CONSTRAINT [FK_Patient_MaritalStatusId]
--GO
/*
ALTER TABLE [dbo].[Patient]  WITH CHECK ADD  CONSTRAINT [FK_Patient_AddressInfo_AttorneyAddressInfoId] FOREIGN KEY([AttorneyAddressInfoId])
	REFERENCES [dbo].[AddressInfo] ([Id])
GO

ALTER TABLE [dbo].[Patient] CHECK CONSTRAINT [FK_Patient_AddressInfo_AttorneyAddressInfoId]
GO

ALTER TABLE [dbo].[Patient]  WITH CHECK ADD  CONSTRAINT [FK_Patient_AddressInfo_AttorneyContactInfoId] FOREIGN KEY([AttorneyContactInfoId])
	REFERENCES [dbo].[ContactInfo] ([Id])
GO

ALTER TABLE [dbo].[Patient] CHECK CONSTRAINT [FK_Patient_AddressInfo_AttorneyContactInfoId]
GO

ALTER TABLE [dbo].[Patient]  WITH CHECK ADD  CONSTRAINT [FK_Patient_PatientEmpInfo_PatientEmpInfoId] FOREIGN KEY([PatientEmpInfoId])
	REFERENCES [dbo].[PatientEmpInfo] ([Id])
GO

ALTER TABLE [dbo].[Patient] CHECK CONSTRAINT [FK_Patient_PatientEmpInfo_PatientEmpInfoId]
GO

ALTER TABLE [dbo].[Patient]  WITH CHECK ADD  CONSTRAINT [FK_Patient_PatientInsuranceInfo_InsuranceInfoId] FOREIGN KEY([InsuranceInfoId])
	REFERENCES [dbo].[PatientInsuranceInfo] ([Id])
GO

ALTER TABLE [dbo].[Patient] CHECK CONSTRAINT [FK_Patient_PatientInsuranceInfo_InsuranceInfoId]
GO
*/

--ALTER TABLE [dbo].[Patient] DROP COLUMN [CompanyId]
/*
Link Patient with user company table
*/
GO

/*
ALTER TABLE [dbo].[Patient] DROP COLUMN [AttorneyName]
GO
ALTER TABLE [dbo].[Patient] DROP CONSTRAINT [FK_Patient_AddressInfo_AttorneyAddressInfoId]
GO
ALTER TABLE [dbo].[Patient] DROP COLUMN [AttorneyAddressInfoId]
GO
ALTER TABLE [dbo].[Patient] DROP CONSTRAINT [FK_Patient_AddressInfo_AttorneyContactInfoId]
GO
ALTER TABLE [dbo].[Patient] DROP COLUMN [AttorneyContactInfoId]
GO
ALTER TABLE [dbo].[Patient] DROP CONSTRAINT [FK_Patient_PatientEmpInfo_PatientEmpInfoId]
GO
ALTER TABLE [dbo].[Patient] DROP COLUMN [PatientEmpInfoId]
GO
ALTER TABLE [dbo].[Patient] DROP CONSTRAINT [FK_Patient_PatientInsuranceInfo_InsuranceInfoId]
GO
ALTER TABLE [dbo].[Patient] DROP COLUMN [InsuranceInfoId]
GO
ALTER TABLE [dbo].[Patient] DROP COLUMN [AccidentInfoId]
GO
ALTER TABLE [dbo].[Patient] DROP COLUMN [AttorneyInfoId]
GO
ALTER TABLE [dbo].[Patient] DROP COLUMN [ReferingOfficeId]
GO
ALTER TABLE [dbo].[Patient] DROP CONSTRAINT [FK_Patient_Company_CompanyId]
GO
ALTER TABLE [dbo].[Patient] DROP COLUMN [CompanyId]
GO
ALTER TABLE [dbo].[Patient] DROP CONSTRAINT [UK_Patient_SSN]
GO
*/
