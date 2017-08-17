IF NOT EXISTS
(
	SELECT	1 
	FROM	INFORMATION_SCHEMA.TABLES
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientEmpInfo'
)
BEGIN
    CREATE TABLE [dbo].[PatientEmpInfo](
	    [Id] [int] IDENTITY(1,1) NOT NULL,
	    --[PatientId] [int] NOT NULL,
        [CaseId] [int] NOT NULL,
	    [JobTitle] [nvarchar](50) NULL,
	    [EmpName] [nvarchar](50) NULL,
	    [AddressInfoId] [int] NOT NULL,
	    [ContactInfoId] [int] NOT NULL,
	    --[IsCurrentEmp] [bit] NOT NULL DEFAULT (0),
	    [IsDeleted] [bit] NULL DEFAULT 0,
	    [CreateByUserID] [int] NOT NULL,
	    [CreateDate] [datetime2](7) NOT NULL,
	    [UpdateByUserID] [int] NULL,
	    [UpdateDate] [datetime2](7) NULL,
        CONSTRAINT [PK_PatientEmpInfo] PRIMARY KEY ([Id])
    )
END
ELSE
BEGIN
	PRINT 'Table [dbo].[PatientEmpInfo] already exists in database: ' + DB_NAME()
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientEmpInfo'
	AND		CONSTRAINT_NAME = 'FK_PatientEmpInfo_AddressInfo_EmpAddressId'
)
BEGIN
	ALTER TABLE [dbo].[PatientEmpInfo] 
        DROP CONSTRAINT [FK_PatientEmpInfo_AddressInfo_EmpAddressId]
END

ALTER TABLE [dbo].[PatientEmpInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientEmpInfo_AddressInfo_EmpAddressId] FOREIGN KEY([AddressInfoId])
REFERENCES [dbo].[AddressInfo] ([id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientEmpInfo'
	AND		CONSTRAINT_NAME = 'FK_PatientEmpInfo_ContactInfo_EmpContactInfoId'
)
BEGIN
	ALTER TABLE [dbo].[PatientEmpInfo] 
        DROP CONSTRAINT [FK_PatientEmpInfo_ContactInfo_EmpContactInfoId]
END

ALTER TABLE [dbo].[PatientEmpInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientEmpInfo_ContactInfo_EmpContactInfoId] FOREIGN KEY([ContactInfoId])
REFERENCES [dbo].[ContactInfo] ([id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientEmpInfo'
	AND		CONSTRAINT_NAME = 'FK_PatientEmpInfo_Patient_PatientId'
)
BEGIN
	ALTER TABLE [dbo].[PatientEmpInfo] 
        DROP CONSTRAINT [FK_PatientEmpInfo_Patient_PatientId]
END

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientEmpInfo'
	AND		COLUMN_NAME = 'CaseId'
)
BEGIN
	PRINT 'Table [dbo].[PatientEmpInfo] already have a Column [CaseId] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[PatientEmpInfo] 
        ADD [CaseId] [int] NULL
    
    UPDATE [dbo].[PatientEmpInfo] 
        SET [CaseId] = (SELECT TOP 1 [Id] FROM [dbo].[Case] WHERE [dbo].[Case].[PatientId] = [dbo].[PatientEmpInfo].[PatientId])

    ALTER TABLE [dbo].[PatientEmpInfo] 
        ALTER COLUMN [CaseId] [int] NOT NULL

    ALTER TABLE [dbo].[PatientEmpInfo] 
        DROP COLUMN [PatientId]
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientEmpInfo'
	AND		CONSTRAINT_NAME = 'FK_PatientEmpInfo_Case_CaseId'
)
BEGIN
	ALTER TABLE [dbo].[PatientEmpInfo] 
        DROP CONSTRAINT [FK_PatientEmpInfo_Case_CaseId]
END

ALTER TABLE [dbo].[PatientEmpInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientEmpInfo_Case_CaseId] FOREIGN KEY([CaseId])
    REFERENCES [dbo].[Case] ([id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientEmpInfo'
	AND		COLUMN_NAME = 'IsCurrentEmp'
)
BEGIN
	ALTER TABLE [dbo].[PatientEmpInfo] 
        DROP COLUMN [IsCurrentEmp]
END

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Case'
	AND		CONSTRAINT_NAME = 'FK_Case_PatientEmpInfo_PatientEmpInfoId'
)
BEGIN
	ALTER TABLE [dbo].[Case] 
        DROP CONSTRAINT [FK_Case_PatientEmpInfo_PatientEmpInfoId]
END

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Case'
	AND		COLUMN_NAME = 'PatientEmpInfoId'
)
BEGIN
	ALTER TABLE [dbo].[Case] 
        DROP COLUMN [PatientEmpInfoId]
END



/*
--CREATE TABLE [dbo].[PatientEmpInfo]
--(
--	[Id] [INT] NOT NULL IDENTITY, 
--	[PatientId] [INT] NOT NULL, 
--	[JobTitle] [NVARCHAR](50) NULL, 
--	[EmpName] [NVARCHAR](50) NULL, 
--	[AddressInfoId] [INT] NOT NULL, 
--	[ContactInfoId] [INT] NOT NULL, 
--	[IsCurrentEmp] [BIT] NOT NULL DEFAULT 0, 

--	[IsDeleted] [BIT] NULL DEFAULT (0),
--	[CreateByUserID] [INT] NOT NULL,
--	[CreateDate] [DATETIME2](7) NOT NULL,
--	[UpdateByUserID] [INT] NULL,
--	[UpdateDate] [DATETIME2](7) NULL, 
--    CONSTRAINT [PK_PatientEmpInfo] PRIMARY KEY ([Id])
--)
--GO

--ALTER TABLE [dbo].[PatientEmpInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientEmpInfo_Patient2_PatientId] FOREIGN KEY([PatientId])
--	REFERENCES [dbo].[Patient2] ([Id])
--GO

--ALTER TABLE [dbo].[PatientEmpInfo] CHECK CONSTRAINT [FK_PatientEmpInfo_Patient2_PatientId]
--GO

--ALTER TABLE [dbo].[PatientEmpInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientEmpInfo_AddressInfo_EmpAddressId] FOREIGN KEY([AddressInfoId])
--	REFERENCES [dbo].[AddressInfo] ([Id])
--GO

--ALTER TABLE [dbo].[PatientEmpInfo] CHECK CONSTRAINT [FK_PatientEmpInfo_AddressInfo_EmpAddressId]
--GO

--ALTER TABLE [dbo].[PatientEmpInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientEmpInfo_ContactInfo_EmpContactInfoId] FOREIGN KEY([ContactInfoId])
--	REFERENCES [dbo].[ContactInfo] ([Id])
--GO

--ALTER TABLE [dbo].[PatientEmpInfo] CHECK CONSTRAINT [FK_PatientEmpInfo_ContactInfo_EmpContactInfoId]
--GO
*/
