IF NOT EXISTS
(
	SELECT	1 
	FROM	INFORMATION_SCHEMA.TABLES
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientInsuranceInfo'
)
BEGIN
    CREATE TABLE [dbo].[PatientInsuranceInfo]
    (
	    [Id] [int] NOT NULL IDENTITY,
	    --[PatientId] [int] NOT NULL,
        [CaseId] [int] NOT NULL,
	    [PolicyHolderName] [NVARCHAR](50) NULL,
	    [PolicyHolderAddressInfoId] [INT] NULL,
	    [PolicyHolderContactInfoId] [INT] NULL,
	    [PolicyOwnerId] [TINYINT] NULL,
	    [InsuranceMasterId] [INT] NULL,
	    [InsuranceCompanyCode] [NVARCHAR](10) NULL,
	    [InsuranceCompanyAddressInfoId] [INT] NULL,
	    [InsuranceCompanyContactInfoId] [INT] NULL,
	    [PolicyNo] [NVARCHAR](50) NULL,
	    [ContactPerson] [NVARCHAR](50) NULL,
	    [InsuranceTypeId] [TINYINT] NULL,
	    [StartDate] [datetime2](7) NULL,
	    [EndDate] [datetime2](7) NULL,
	    [InsuredAmount] [decimal] NULL, 
	    [IsInActive] [BIT] NUll DEFAULT (0),
	
	    [IsDeleted] [bit] NULL DEFAULT (0),
	    [CreateByUserID] [int] NOT NULL,
	    [CreateDate] [datetime2](7) NOT NULL,
	    [UpdateByUserID] [int] NULL,
	    [UpdateDate] [datetime2](7) NULL, 
        CONSTRAINT [PK_PatientInsuranceInfo] PRIMARY KEY ([Id])
    )
END
ELSE
BEGIN
	PRINT 'Table [dbo].[PatientInsuranceInfo] already exists in database: ' + DB_NAME()
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientInsuranceInfo'
	AND		CONSTRAINT_NAME = 'FK_PatientInsuranceInfo_Patient_PatientId'
)
BEGIN
	ALTER TABLE [dbo].[PatientInsuranceInfo] 
        DROP CONSTRAINT [FK_PatientInsuranceInfo_Patient_PatientId]
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientInsuranceInfo'
	AND		COLUMN_NAME = 'CaseId'
)
BEGIN
	PRINT 'Table [dbo].[PatientInsuranceInfo] already have a Column [CaseId] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[PatientInsuranceInfo] 
        ADD [CaseId] [int] NULL
    
    UPDATE [dbo].[PatientInsuranceInfo] 
        SET [CaseId] = (SELECT TOP 1 [Id] FROM [dbo].[Case] WHERE [dbo].[Case].[PatientId] = [dbo].[PatientInsuranceInfo].[PatientId])

    ALTER TABLE [dbo].[PatientInsuranceInfo] 
        ALTER COLUMN [CaseId] [int] NOT NULL

    ALTER TABLE [dbo].[PatientInsuranceInfo] 
        DROP COLUMN [PatientId]
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientInsuranceInfo'
	AND		CONSTRAINT_NAME = 'FK_PatientInsuranceInfo_Case_CaseId'
)
BEGIN
	ALTER TABLE [dbo].[PatientInsuranceInfo] 
        DROP CONSTRAINT [FK_PatientInsuranceInfo_Case_CaseId]
END

ALTER TABLE [dbo].[PatientInsuranceInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientInsuranceInfo_Case_CaseId] FOREIGN KEY([CaseId])
	REFERENCES [dbo].[Case] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientInsuranceInfo'
	AND		CONSTRAINT_NAME = 'FK_PatientInsuranceInfo_AddressInfo_PolicyHolderAddressInfoId'
)
BEGIN
	ALTER TABLE [dbo].[PatientInsuranceInfo] 
        DROP CONSTRAINT [FK_PatientInsuranceInfo_AddressInfo_PolicyHolderAddressInfoId]
END

ALTER TABLE [dbo].[PatientInsuranceInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientInsuranceInfo_AddressInfo_PolicyHolderAddressInfoId] FOREIGN KEY([PolicyHolderAddressInfoId])
	REFERENCES [dbo].[AddressInfo] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientInsuranceInfo'
	AND		CONSTRAINT_NAME = 'FK_PatientInsuranceInfo_ContactInfo_PolicyHolderContactInfoId'
)
BEGIN
	ALTER TABLE [dbo].[PatientInsuranceInfo] 
        DROP CONSTRAINT [FK_PatientInsuranceInfo_ContactInfo_PolicyHolderContactInfoId]
END

ALTER TABLE [dbo].[PatientInsuranceInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientInsuranceInfo_ContactInfo_PolicyHolderContactInfoId] FOREIGN KEY([PolicyHolderContactInfoId])
	REFERENCES [dbo].[ContactInfo] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientInsuranceInfo'
	AND		CONSTRAINT_NAME = 'FK_PatientInsuranceInfo_PolicyOwner_PolicyOwnerId'
)
BEGIN
	ALTER TABLE [dbo].[PatientInsuranceInfo] 
        DROP CONSTRAINT [FK_PatientInsuranceInfo_PolicyOwner_PolicyOwnerId]
END

ALTER TABLE [dbo].[PatientInsuranceInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientInsuranceInfo_PolicyOwner_PolicyOwnerId] FOREIGN KEY([PolicyOwnerId])
	REFERENCES [dbo].[PolicyOwner] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientInsuranceInfo'
	AND		CONSTRAINT_NAME = 'FK_PatientInsuranceInfo_AddressInfo_InsuranceCompanyAddressInfoId'
)
BEGIN
	ALTER TABLE [dbo].[PatientInsuranceInfo] 
        DROP CONSTRAINT [FK_PatientInsuranceInfo_AddressInfo_InsuranceCompanyAddressInfoId]
END

ALTER TABLE [dbo].[PatientInsuranceInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientInsuranceInfo_AddressInfo_InsuranceCompanyAddressInfoId] FOREIGN KEY([InsuranceCompanyAddressInfoId])
	REFERENCES [dbo].[AddressInfo] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientInsuranceInfo'
	AND		CONSTRAINT_NAME = 'FK_PatientInsuranceInfo_ContactInfo_InsuranceCompanyContactInfoId'
)
BEGIN
	ALTER TABLE [dbo].[PatientInsuranceInfo] 
        DROP CONSTRAINT [FK_PatientInsuranceInfo_ContactInfo_InsuranceCompanyContactInfoId]
END

ALTER TABLE [dbo].[PatientInsuranceInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientInsuranceInfo_ContactInfo_InsuranceCompanyContactInfoId] FOREIGN KEY([InsuranceCompanyContactInfoId])
	REFERENCES [dbo].[ContactInfo] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientInsuranceInfo'
	AND		CONSTRAINT_NAME = 'FK_PatientInsuranceInfo_InsuranceType_InsuranceTypeId'
)
BEGIN
	ALTER TABLE [dbo].[PatientInsuranceInfo] 
        DROP CONSTRAINT [FK_PatientInsuranceInfo_InsuranceType_InsuranceTypeId]
END

ALTER TABLE [dbo].[PatientInsuranceInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientInsuranceInfo_InsuranceType_InsuranceTypeId] FOREIGN KEY([InsuranceTypeId])
	REFERENCES [dbo].[InsuranceType] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientInsuranceInfo'
	AND		CONSTRAINT_NAME = 'FK_PatientInsuranceInfo_InsuranceMaster_InsuranceMasterId'
)
BEGIN
	ALTER TABLE [dbo].[PatientInsuranceInfo] 
        DROP CONSTRAINT [FK_PatientInsuranceInfo_InsuranceMaster_InsuranceMasterId]
END

ALTER TABLE [dbo].[PatientInsuranceInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientInsuranceInfo_InsuranceMaster_InsuranceMasterId] FOREIGN KEY([InsuranceMasterId])
	REFERENCES [dbo].[InsuranceMaster] ([Id])
GO


---------------------------------------------------------------------------
--CREATE TABLE [dbo].[PatientInsuranceInfo]
--(
--	[Id] [int] NOT NULL IDENTITY,
--	[PatientId] [int] NOT NULL,
--	[PolicyHolderName] [NVARCHAR](50) NULL,
--	[PolicyHolderAddressInfoId] [INT] NULL,
--	[PolicyHolderContactInfoId] [INT] NULL,
--	[PolicyOwnerId] [TINYINT] NULL,
--	[InsuranceMasterId] [INT] NULL, -- look up and also add, companay link
--	[InsuranceCompanyCode] [NVARCHAR](10) NULL,
--	[InsuranceCompanyAddressInfoId] [INT] NULL,
--	[InsuranceCompanyContactInfoId] [INT] NULL,
--	[PolicyNo] [NVARCHAR](50) NULL,
--	[ContactPerson] [NVARCHAR](50) NULL,
--	--[ClaimFileNo] [NVARCHAR](50) NULL, -- Remove
--	--[WCBNo] [NVARCHAR](50) NULL,--???? -- remove, link with treatment provider/doctor
--	[InsuranceTypeId] [TINYINT] NULL,
--	[StartDate] [datetime2](7) NULL,
--	[EndDate] [datetime2](7) NULL,
--	[InsuredAmount] [decimal] NULL, 
--	[IsInActive] [BIT] NUll DEFAULT (0),
	
--	[IsDeleted] [bit] NULL DEFAULT (0),
--	[CreateByUserID] [int] NOT NULL,
--	[CreateDate] [datetime2](7) NOT NULL,
--	[UpdateByUserID] [int] NULL,
--	[UpdateDate] [datetime2](7) NULL, 
--    CONSTRAINT [PK_PatientInsuranceInfo] PRIMARY KEY ([Id])
--)
--GO

--ALTER TABLE [dbo].[PatientInsuranceInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientInsuranceInfo_Patient_PatientId] FOREIGN KEY([PatientId])
--	REFERENCES [dbo].[Patient] ([Id])
--GO

--ALTER TABLE [dbo].[PatientInsuranceInfo] CHECK CONSTRAINT [FK_PatientInsuranceInfo_Patient_PatientId]	
--GO

--ALTER TABLE [dbo].[PatientInsuranceInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientInsuranceInfo_AddressInfo_PolicyHolderAddressInfoId] FOREIGN KEY([PolicyHolderAddressInfoId])
--	REFERENCES [dbo].[AddressInfo] ([Id])
--GO

--ALTER TABLE [dbo].[PatientInsuranceInfo] CHECK CONSTRAINT [FK_PatientInsuranceInfo_AddressInfo_PolicyHolderAddressInfoId]
--GO

--ALTER TABLE [dbo].[PatientInsuranceInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientInsuranceInfo_ContactInfo_PolicyHolderContactInfoId] FOREIGN KEY([PolicyHolderContactInfoId])
--	REFERENCES [dbo].[ContactInfo] ([Id])
--GO

--ALTER TABLE [dbo].[PatientInsuranceInfo] CHECK CONSTRAINT [FK_PatientInsuranceInfo_ContactInfo_PolicyHolderContactInfoId]
--GO

--ALTER TABLE [dbo].[PatientInsuranceInfo] ALTER COLUMN [PolicyOwnerId] [TINYINT] NULL 
--GO
--ALTER TABLE [dbo].[PatientInsuranceInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientInsuranceInfo_PolicyOwner_PolicyOwnerId] FOREIGN KEY([PolicyOwnerId])
--	REFERENCES [dbo].[PolicyOwner] ([Id])
--GO

--ALTER TABLE [dbo].[PatientInsuranceInfo] CHECK CONSTRAINT [FK_PatientInsuranceInfo_PolicyOwner_PolicyOwnerId]
--GO

--ALTER TABLE [dbo].[PatientInsuranceInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientInsuranceInfo_AddressInfo_InsuranceCompanyAddressInfoId] FOREIGN KEY([InsuranceCompanyAddressInfoId])
--	REFERENCES [dbo].[AddressInfo] ([Id])
--GO

--ALTER TABLE [dbo].[PatientInsuranceInfo] CHECK CONSTRAINT [FK_PatientInsuranceInfo_AddressInfo_InsuranceCompanyAddressInfoId]
--GO

--ALTER TABLE [dbo].[PatientInsuranceInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientInsuranceInfo_ContactInfo_InsuranceCompanyContactInfoId] FOREIGN KEY([InsuranceCompanyContactInfoId])
--	REFERENCES [dbo].[ContactInfo] ([Id])
--GO

--ALTER TABLE [dbo].[PatientInsuranceInfo] CHECK CONSTRAINT [FK_PatientInsuranceInfo_ContactInfo_InsuranceCompanyContactInfoId]
--GO

--ALTER TABLE [dbo].[PatientInsuranceInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientInsuranceInfo_InsuranceType_InsuranceTypeId] FOREIGN KEY([InsuranceTypeId])
--	REFERENCES [dbo].[InsuranceType] ([Id])
--GO

--ALTER TABLE [dbo].[PatientInsuranceInfo] CHECK CONSTRAINT [FK_PatientInsuranceInfo_InsuranceType_InsuranceTypeId]
--GO

--ALTER TABLE [dbo].[PatientInsuranceInfo] ADD [InsuranceMasterId] [INT] NULL
--ALTER TABLE [dbo].[PatientInsuranceInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientInsuranceInfo_InsuranceMaster_InsuranceMasterId] FOREIGN KEY([InsuranceMasterId])
--	REFERENCES [dbo].[InsuranceMaster] ([Id])
--GO

--ALTER TABLE [dbo].[PatientInsuranceInfo] CHECK CONSTRAINT [FK_PatientInsuranceInfo_InsuranceMaster_InsuranceMasterId]
--GO
