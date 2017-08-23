IF NOT EXISTS
(
	SELECT	1 
	FROM	INFORMATION_SCHEMA.TABLES
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'SchoolInformation'
)
BEGIN
    CREATE TABLE [dbo].[SchoolInformation]
    (
        [Id] INT NOT NULL, 
        [CaseId] INT NOT NULL,
        [NameOfSchool] NVARCHAR(256) NOT NULL, 
        [Grade] NVARCHAR(50) NULL, 
        [LossOfTime] BIT NULL CONSTRAINT [DF_SchoolInformation_LossOfTime] DEFAULT 0,
        [DatesOutOfSchool] [NVARCHAR](128) NULL,

        [IsDeleted] [bit] NULL,
	    [CreateByUserID] [int] NOT NULL,
	    [CreateDate] [datetime2](7) NOT NULL,
	    [UpdateByUserID] [int] NULL,
	    [UpdateDate] [datetime2](7) NULL,
	    CONSTRAINT [PK_SchoolInformation] PRIMARY KEY ([Id])
    )
END
ELSE
BEGIN
	PRINT 'Table [dbo].[SchoolInformation] already exists in database: ' + DB_NAME()
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'SchoolInformation'
	AND		CONSTRAINT_NAME = 'FK_SchoolInformation_Case_CaseId'
)
BEGIN
	ALTER TABLE [dbo].[SchoolInformation] 
        DROP CONSTRAINT [FK_SchoolInformation_Case_CaseId]
END

ALTER TABLE [dbo].[SchoolInformation]  WITH CHECK ADD  CONSTRAINT [FK_SchoolInformation_Case_CaseId] FOREIGN KEY([CaseId])
	REFERENCES [dbo].[Case] ([Id])
GO