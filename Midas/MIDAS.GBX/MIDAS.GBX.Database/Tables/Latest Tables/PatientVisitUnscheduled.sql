IF NOT EXISTS
(
	SELECT	1 
	FROM	INFORMATION_SCHEMA.TABLES
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientVisitUnscheduled'
)
BEGIN
    CREATE TABLE [dbo].[PatientVisitUnscheduled]
    (
	    [Id] [INT] NOT NULL IDENTITY,
	    [CaseId] [INT] NOT NULL,
	    [PatientId] [INT] NOT NULL,
	    [EventStart] [DATETIME2] NULL,
        [MedicalProviderName] [NVARCHAR](256) NULL,
        [DoctorName] [NVARCHAR](256) NULL,
        [Notes] [NVARCHAR](512) NULL,

	    [IsDeleted] [bit] NULL DEFAULT 0,
	    [CreateByUserID] [int] NOT NULL,
	    [CreateDate] [datetime2](7) NOT NULL,
	    [UpdateByUserID] [int] NULL,
	    [UpdateDate] [datetime2](7) NULL, 
        CONSTRAINT [PK_PatientVisitUnscheduled] PRIMARY KEY ([Id])
    )
END
ELSE
BEGIN
	PRINT 'Table [dbo].[PatientVisitUnscheduled] already exists in database: ' + DB_NAME()
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientVisitUnscheduled'
	AND		CONSTRAINT_NAME = 'FK_PatientVisitUnscheduled_Case_CaseId'
)
BEGIN
	ALTER TABLE [dbo].[PatientVisitUnscheduled] 
        DROP CONSTRAINT [FK_PatientVisitUnscheduled_Case_CaseId]
END
GO

ALTER TABLE [dbo].[PatientVisitUnscheduled]  WITH CHECK ADD  CONSTRAINT [FK_PatientVisitUnscheduled_Case_CaseId] FOREIGN KEY([CaseId])
	REFERENCES [dbo].[Case] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientVisitUnscheduled'
	AND		CONSTRAINT_NAME = 'FK_PatientVisitUnscheduled_Patient_PatientId'
)
BEGIN
	ALTER TABLE [dbo].[PatientVisitUnscheduled] 
        DROP CONSTRAINT [FK_PatientVisitUnscheduled_Patient_PatientId]
END
GO

ALTER TABLE [dbo].[PatientVisitUnscheduled]  WITH CHECK ADD  CONSTRAINT [FK_PatientVisitUnscheduled_Patient_PatientId] FOREIGN KEY([PatientId])
	REFERENCES [dbo].[Patient] ([Id])
GO
