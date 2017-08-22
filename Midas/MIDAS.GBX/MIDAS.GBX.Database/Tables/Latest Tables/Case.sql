IF NOT EXISTS
(
	SELECT	1 
	FROM	INFORMATION_SCHEMA.TABLES
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Case'
)
BEGIN
    CREATE TABLE [dbo].[Case]
    (
	    [Id] [int] IDENTITY(1,1) NOT NULL,
	    [PatientId] [int] NOT NULL,
	    [CaseName] [nvarchar](50) NULL,
	    [CaseTypeId] [TINYINT] NULL,
	    [CarrierCaseNo] [nvarchar](50) NULL,
	    [CaseStatusId] [TINYINT] NULL,
        [CaseSource] [VARCHAR](50) NULL,
        [ClaimFileNumber] [INT] NULL,
        [Medicare] [BIT] NULL CONSTRAINT [DF_Case_Medicare] DEFAULT 0,
        [Medicaid] [BIT] NULL CONSTRAINT [DF_Case_Medicaid] DEFAULT 0,
        [SSDisabililtyIncome] [BIT] NULL CONSTRAINT [DF_Case_SSDisabililtyIncome] DEFAULT 0,

	    [IsDeleted] [bit] NULL,
	    [CreateByUserID] [int] NOT NULL,
	    [CreateDate] [datetime2](7) NOT NULL,
	    [UpdateByUserID] [int] NULL,
	    [UpdateDate] [datetime2](7) NULL,
	    CONSTRAINT [PK_Case] PRIMARY KEY ([Id])
    )
END
ELSE
BEGIN
	PRINT 'Table [dbo].[Case] already exists in database: ' + DB_NAME()
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Case'
	AND		CONSTRAINT_NAME = 'FK_Case_Patient_PatientId'
)
BEGIN
	ALTER TABLE [dbo].[Case] 
        DROP CONSTRAINT [FK_Case_Patient_PatientId]
END
GO

ALTER TABLE [dbo].[Case]  WITH CHECK ADD  CONSTRAINT [FK_Case_Patient_PatientId] FOREIGN KEY([PatientId])
	REFERENCES [dbo].[Patient] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Case'
	AND		CONSTRAINT_NAME = 'FK_Case_CaseType_CaseTypeId'
)
BEGIN
	ALTER TABLE [dbo].[Case] 
        DROP CONSTRAINT [FK_Case_CaseType_CaseTypeId]
END
GO

ALTER TABLE [dbo].[Case]  WITH CHECK ADD  CONSTRAINT [FK_Case_CaseType_CaseTypeId] FOREIGN KEY([CaseTypeId])
	REFERENCES [dbo].[CaseType] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Case'
	AND		CONSTRAINT_NAME = 'FK_Case_CaseStatus_CaseStatusId'
)
BEGIN
	ALTER TABLE [dbo].[Case] 
        DROP CONSTRAINT [FK_Case_CaseStatus_CaseStatusId]
END
GO

ALTER TABLE [dbo].[Case]  WITH CHECK ADD  CONSTRAINT [FK_Case_CaseStatus_CaseStatusId] FOREIGN KEY([CaseStatusId])
	REFERENCES [dbo].[CaseStatus] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Case'
	AND		COLUMN_NAME = 'Medicare'
)
BEGIN
	PRINT 'Table [dbo].[Case] already have a Column [Medicare] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[Case] 
        ADD [Medicare] [BIT] NULL DEFAULT 0
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Case'
	AND		COLUMN_NAME = 'Medicaid'
)
BEGIN
	PRINT 'Table [dbo].[Case] already have a Column [Medicaid] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[Case] 
        ADD [Medicaid] [BIT] NULL DEFAULT 0
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Case'
	AND		COLUMN_NAME = 'SSDisabililtyIncome'
)
BEGIN
	PRINT 'Table [dbo].[Case] already have a Column [SSDisabililtyIncome] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[Case] 
        ADD [SSDisabililtyIncome] [BIT] NULL DEFAULT 0
END
GO

--ALTER TABLE [dbo].[Case] DROP [LocationId]
--ALTER TABLE [dbo].[Case] ADD [FileUploadPath] [NVARCHAR](250) NULL

/*
ALTER TABLE [dbo].[Case] DROP CONSTRAINT [DF__Case__Transporta__1387E197]
GO
ALTER TABLE [dbo].[Case] DROP COLUMN [Transportation]
GO
ALTER TABLE [dbo].[Case] DROP COLUMN [FileUploadPath]
GO
*/



/*
ALTER TABLE [dbo].[Case] ADD [CreatedByCompanyId] [INT] NULL
GO
UPDATE [dbo].[Case] SET [dbo].[Case].[CreatedByCompanyId] = (SELECT TOP 1 [CompanyId] FROM [dbo].[CaseCompanyMapping] AS tbl2 WHERE tbl2.[CaseId] = [dbo].[Case].[Id] AND (tbl2.[IsDeleted] = 0 OR tbl2.[IsDeleted] IS NULL))
GO
UPDATE [dbo].[Case] SET [dbo].[Case].[CreatedByCompanyId] = (SELECT TOP 1 [CompanyId] FROM [dbo].[CaseCompanyMapping] AS tbl2 WHERE tbl2.[CaseId] = [dbo].[Case].[Id]) 
    WHERE [dbo].[Case].[CreatedByCompanyId] IS NULL
GO
UPDATE [dbo].[Case] SET [dbo].[Case].[CreatedByCompanyId] = 1 WHERE [dbo].[Case].[CreatedByCompanyId] IS NULL
GO
ALTER TABLE [dbo].[Case] ALTER COLUMN [CreatedByCompanyId] [INT] NOT NULL
GO
*/






--IF EXISTS
--(
--	SELECT	1
--	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
--	WHERE	TABLE_SCHEMA = 'dbo'
--	AND		TABLE_NAME = 'Case'
--	AND		CONSTRAINT_NAME = 'FK_Case_Company_AttorneyId'
--)
--BEGIN
--	ALTER TABLE [dbo].[Case]
--	DROP CONSTRAINT FK_Case_Company_AttorneyId
--END
--GO

--IF EXISTS
--(
--	SELECT	1
--	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
--	WHERE	TABLE_SCHEMA = 'dbo'
--	AND		TABLE_NAME = 'Case'
--	AND		CONSTRAINT_NAME = 'FK_Case_Company_CreatedByCompanyId'

--)
--BEGIN
--	ALTER TABLE [dbo].[Case]
--	DROP CONSTRAINT FK_Case_Company_CreatedByCompanyId
--END
--GO

--IF EXISTS
--(
--	SELECT	1
--	FROM	INFORMATION_SCHEMA.COLUMNS
--	WHERE	TABLE_SCHEMA = 'dbo'
--	AND		TABLE_NAME = 'Case'
--	AND     COLUMN_NAME = 'AttorneyId'
--)
--BEGIN
--	ALTER TABLE [dbo].[Case]
--	DROP COLUMN [AttorneyId]
--END
--GO



--IF EXISTS
--(
--	SELECT	1
--	FROM	INFORMATION_SCHEMA.COLUMNS
--	WHERE	TABLE_SCHEMA = 'dbo'
--	AND		TABLE_NAME = 'Case'
--	AND    COLUMN_NAME = 'CreatedByCompanyId'
--)
--BEGIN
--	ALTER TABLE [dbo].[Case]
--	DROP COLUMN [CreatedByCompanyId]
--END
--GO


