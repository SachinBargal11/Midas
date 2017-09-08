
--IF NOT EXISTS
--(
--	SELECT	1 
--	FROM	INFORMATION_SCHEMA.TABLES
--	WHERE	TABLE_SCHEMA = 'dbo'
--	AND		TABLE_NAME = 'InsuranceMaster'
--)
--BEGIN
    CREATE TABLE [dbo].[InsuranceMaster]
    (
	    [Id] [INT] NOT NULL IDENTITY,
	    [CompanyCode] NVARCHAR(10) NOT NULL,
	    [CompanyName] NVARCHAR(100) NOT NULL,
	    [AddressInfoId] [INT] NULL,
	    [ContactInfoId] [INT] NULL,
        [CreatedByCompanyId] [INT] NULL,

	    [IsDeleted] [bit] NULL CONSTRAINT [DF_InsuranceMaster_IsDeleted] DEFAULT 0,
	    [CreateByUserID] [int] NOT NULL,
	    [CreateDate] [datetime2](7) NOT NULL,
	    [UpdateByUserID] [int] NULL,
	    [UpdateDate] [datetime2](7) NULL, 
        CONSTRAINT [PK_InsuranceMaster] PRIMARY KEY ([Id])
    ) ON [PRIMARY]
--END
--ELSE
--BEGIN
--	PRINT 'Table [dbo].[InsuranceMaster] already exists in database: ' + DB_NAME()
--END
GO

--IF EXISTS
--(
--	SELECT	1
--	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
--	WHERE	TABLE_SCHEMA = 'dbo'
--	AND		TABLE_NAME = 'InsuranceMaster'
--	AND		CONSTRAINT_NAME = 'FK_InsuranceMaster_AddressInfo_AddressInfoId'
--)
--BEGIN
--	ALTER TABLE [dbo].[InsuranceMaster] 
--        DROP CONSTRAINT [FK_InsuranceMaster_AddressInfo_AddressInfoId]
--END

ALTER TABLE [dbo].[InsuranceMaster]  WITH CHECK ADD  CONSTRAINT [FK_InsuranceMaster_AddressInfo_AddressInfoId] FOREIGN KEY([AddressInfoId])
	REFERENCES [dbo].[AddressInfo] ([Id])
GO

--IF EXISTS
--(
--	SELECT	1
--	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
--	WHERE	TABLE_SCHEMA = 'dbo'
--	AND		TABLE_NAME = 'InsuranceMaster'
--	AND		CONSTRAINT_NAME = 'FK_InsuranceMaster_AddressInfo_ContactInfoId'
--)
--BEGIN
--	ALTER TABLE [dbo].[InsuranceMaster] 
--        DROP CONSTRAINT [FK_InsuranceMaster_AddressInfo_ContactInfoId]
--END

ALTER TABLE [dbo].[InsuranceMaster]  WITH CHECK ADD  CONSTRAINT [FK_InsuranceMaster_AddressInfo_ContactInfoId] FOREIGN KEY([ContactInfoId])
	REFERENCES [dbo].[ContactInfo] ([Id])
GO

--IF EXISTS
--(
--	SELECT	1
--	FROM	INFORMATION_SCHEMA.COLUMNS
--	WHERE	TABLE_SCHEMA = 'dbo'
--	AND		TABLE_NAME = 'InsuranceMaster'
--	AND		COLUMN_NAME = 'CreatedByCompanyId'
--)
--BEGIN
--	PRINT 'Table [dbo].[InsuranceMaster] already have column [CreatedByCompanyId] in database: ' + DB_NAME()
--END
--ELSE
--BEGIN
--    ALTER TABLE [dbo].[InsuranceMaster] ADD [CreatedByCompanyId] [INT] NULL
--END
GO

--IF EXISTS
--(
--	SELECT	1
--	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
--	WHERE	TABLE_SCHEMA = 'dbo'
--	AND		TABLE_NAME = 'InsuranceMaster'
--	AND		CONSTRAINT_NAME = 'FK_InsuranceMaster_Company_CreatedByCompanyId'
--)
--BEGIN
--	ALTER TABLE [dbo].[InsuranceMaster] 
--        DROP CONSTRAINT [FK_InsuranceMaster_Company_CreatedByCompanyId]
--END

ALTER TABLE [dbo].[InsuranceMaster]  WITH CHECK ADD  CONSTRAINT [FK_InsuranceMaster_Company_CreatedByCompanyId] FOREIGN KEY([CreatedByCompanyId])
	REFERENCES [dbo].[Company] ([Id])
GO


IF NOT EXISTS
(
	SELECT	'X' 
	FROM	INFORMATION_SCHEMA.COLUMNS 
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'InsuranceMaster'
	AND		COLUMN_NAME = 'ZeusID'
)

ALTER TABLE [dbo].[InsuranceMaster]
ADD ZeusID NVARCHAR (50) NULL
GO
---------------------------------------------

IF NOT EXISTS
(
	SELECT	'X' 
	FROM	INFORMATION_SCHEMA.COLUMNS 
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'InsuranceMaster'
	AND		COLUMN_NAME = 'PriorityBilling'
)

ALTER TABLE [dbo].[InsuranceMaster]
ADD PriorityBilling INT NULL
GO
----------------------------------------------
IF NOT EXISTS
(
	SELECT	'X' 
	FROM	INFORMATION_SCHEMA.COLUMNS 
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'InsuranceMaster'
	AND		COLUMN_NAME = 'Only1500Form'
)

ALTER TABLE [dbo].[InsuranceMaster]
ADD Only1500Form INT NULL
GO
-----------------------------------------------
IF NOT EXISTS
(
	SELECT	'X' 
	FROM	INFORMATION_SCHEMA.COLUMNS 
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'InsuranceMaster'
	AND		COLUMN_NAME = 'PaperAuthorization'
)

ALTER TABLE [dbo].[InsuranceMaster]
ADD PaperAuthorization INT NULL
GO
