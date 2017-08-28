IF NOT EXISTS
(
	SELECT	1 
	FROM	INFORMATION_SCHEMA.TABLES
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientPriorAccidentInjuries'
)
BEGIN
    CREATE TABLE [dbo].[PatientPriorAccidentInjuries]
    (
        [Id] [INT] NOT NULL IDENTITY,
	    [CaseId] [INT] NOT NULL,
	
        [AccidentBefore] BIT NULL CONSTRAINT [DF_PatientPriorAccidentInjuries_AccidentBefore] DEFAULT 0, 
        [AccidentBeforeExplain] NVARCHAR(1024) NULL, 
        [LawsuitWorkerCompBefore] BIT NULL CONSTRAINT [DF_PatientPriorAccidentInjuries_LawsuitWorkerCompBefore] DEFAULT 0, 
        [LawsuitWorkerCompBeforeExplain] NVARCHAR(1024) NULL, 
        [PhysicalComplaintsBefore] BIT NULL CONSTRAINT [DF_PatientPriorAccidentInjuries_PhysicalComplaintsBefore] DEFAULT 0, 
        [PhysicalComplaintsBeforeExplain] NVARCHAR(1024) NULL, 
        [OtherInformation] NVARCHAR(1024) NULL, 

        [IsDeleted] [bit] NULL CONSTRAINT [DF_PatientPriorAccidentInjuries_[IsDeleted] DEFAULT 0, 
	    [CreateByUserID] [int] NOT NULL,
	    [CreateDate] [datetime2](7) NOT NULL,
	    [UpdateByUserID] [int] NULL,
	    [UpdateDate] [datetime2](7) NULL, 
        CONSTRAINT [PK_PatientPriorAccidentInjuries] PRIMARY KEY ([Id])
    )
END
ELSE
BEGIN
	PRINT 'Table [dbo].[PatientPriorAccidentInjuries] already exists in database: ' + DB_NAME()
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientPriorAccidentInjuries'
	AND		CONSTRAINT_NAME = 'FK_PatientPriorAccidentInjuries_Case_CaseId'
)
BEGIN
	ALTER TABLE [dbo].[PatientPriorAccidentInjuries] 
        DROP CONSTRAINT [FK_PatientPriorAccidentInjuries_Case_CaseId]
END
GO

ALTER TABLE [dbo].[PatientPriorAccidentInjuries]  WITH CHECK ADD  CONSTRAINT [FK_PatientPriorAccidentInjuries_Case_CaseId] FOREIGN KEY([CaseId])
	REFERENCES [dbo].[Case] ([Id])
GO
