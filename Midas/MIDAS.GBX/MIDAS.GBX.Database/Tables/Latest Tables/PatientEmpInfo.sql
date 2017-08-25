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
        [CaseId] [int] NOT NULL,
	    [JobTitle] [nvarchar](50) NULL,
	    [EmpName] [nvarchar](50) NULL,
	    [AddressInfoId] [int] NOT NULL,
	    [ContactInfoId] [int] NOT NULL,
        [Salary] [NVARCHAR](32) NULL,
        [HourOrYearly] [Bit] NULL CONSTRAINT [DF_PatientEmpInfo_PerHourOrYearly] DEFAULT 0,
        [LossOfEarnings] [BIT] NULL CONSTRAINT [DF_PatientEmpInfo_LossOfEarnings] DEFAULT 0,
        [DatesOutOfWork] [NVARCHAR](128) NULL,
        [HoursPerWeek] [NUMERIC](5,2) NULL,
        [AccidentAtEmployment] [BIT] NULL CONSTRAINT [DF_PatientEmpInfo_AccidentAtEmployment] DEFAULT 0,

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

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientEmpInfo'
	AND		COLUMN_NAME = 'Salary'
)
BEGIN
	PRINT 'Table [dbo].[PatientEmpInfo] already have a Column [Salary] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[PatientEmpInfo] 
        ADD [Salary] [NVARCHAR](32) NULL
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientEmpInfo'
	AND		COLUMN_NAME = 'HourOrYearly'
)
BEGIN
	PRINT 'Table [dbo].[PatientEmpInfo] already have a Column [HourOrYearly] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[PatientEmpInfo] 
        ADD [HourOrYearly] [Bit] NULL CONSTRAINT [DF_PatientEmpInfo_PerHourOrYearly] DEFAULT 0
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientEmpInfo'
	AND		COLUMN_NAME = 'LossOfEarnings'
)
BEGIN
	PRINT 'Table [dbo].[PatientEmpInfo] already have a Column [LossOfEarnings] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[PatientEmpInfo] 
        ADD [LossOfEarnings] [BIT] NULL CONSTRAINT [DF_PatientEmpInfo_LossOfEarnings] DEFAULT 0
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientEmpInfo'
	AND		COLUMN_NAME = 'DatesOutOfWork'
)
BEGIN
	PRINT 'Table [dbo].[PatientEmpInfo] already have a Column [DatesOutOfWork] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[PatientEmpInfo] 
        ADD [DatesOutOfWork] [NVARCHAR](128) NULL
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientEmpInfo'
	AND		COLUMN_NAME = 'HoursPerWeek'
)
BEGIN
	PRINT 'Table [dbo].[PatientEmpInfo] already have a Column [HoursPerWeek] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[PatientEmpInfo] 
        ADD [HoursPerWeek] [NUMERIC](3,2) NULL
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientEmpInfo'
	AND		COLUMN_NAME = 'AccidentAtEmployment'
)
BEGIN
	PRINT 'Table [dbo].[PatientEmpInfo] already have a Column [AccidentAtEmployment] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[PatientEmpInfo] 
        ADD [AccidentAtEmployment] [BIT] NULL CONSTRAINT [DF_PatientEmpInfo_AccidentAtEmployment] DEFAULT 0
END
GO
