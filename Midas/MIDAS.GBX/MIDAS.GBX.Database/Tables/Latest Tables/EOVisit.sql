IF NOT EXISTS
(
	SELECT	1 
	FROM	INFORMATION_SCHEMA.TABLES
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'EOVisit'
)
BEGIN
	CREATE TABLE [dbo].[EOVisit]
    (
	    [ID] [int] IDENTITY(1,1) NOT NULL,
	    [DoctorId] [int] NULL,
	    [InsuranceProviderId] [int] NULL,
	    [CalendarEventId] [int] NOT NULL,
	    [VisitStatusId] [int] NULL,
	    [EventStart] [datetime2](7) NULL,
	    [EventEnd] [datetime2](7) NULL,
	    [Notes] [nvarchar](250) NULL,
	    [IsDeleted] [bit] NULL DEFAULT ((0)),
	    [CreateByUserID] [int] NOT NULL,
	    [CreateDate] [datetime2](7) NOT NULL,
	    [UpdateByUserID] [int] NULL,
	    [UpdateDate] [datetime2](7) NULL,
	    [VisitCreatedByCompanyId] [int] NOT NULL,
	    [PatientId] [int] NULL,
        [CaseId] [int] NULL,
        CONSTRAINT [PK_EOVisit] PRIMARY KEY ([Id])
    )
END
ELSE
BEGIN
	PRINT 'Table [dbo].[EOVisit] already exists in database: ' + DB_NAME()
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'EOVisit'
	AND		CONSTRAINT_NAME = 'FK_EOVisit_Doctor_DoctorId'
)
BEGIN
	ALTER TABLE [dbo].[EOVisit] DROP CONSTRAINT FK_EOVisit_Doctor_DoctorId
END

ALTER TABLE [dbo].[EOVisit] ADD CONSTRAINT FK_EOVisit_Doctor_DoctorId FOREIGN KEY (DoctorId)
    REFERENCES [dbo].[Doctor](id)

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'EOVisit'
	AND		CONSTRAINT_NAME = 'FK_EOVisit_Insurance_InsuranceProviderId'
)
BEGIN
	ALTER TABLE [dbo].[EOVisit] DROP CONSTRAINT FK_EOVisit_Insurance_InsuranceProviderId
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'EOVisit'
	AND		CONSTRAINT_NAME = 'FK_EOVisit_InsuranceMaster_InsuranceProviderId'
)
BEGIN
	ALTER TABLE [dbo].[EOVisit] DROP CONSTRAINT FK_EOVisit_InsuranceMaster_InsuranceProviderId
END

ALTER TABLE [dbo].[EOVisit] ADD CONSTRAINT FK_EOVisit_InsuranceMaster_InsuranceProviderId FOREIGN KEY (InsuranceProviderId)
    REFERENCES [dbo].[InsuranceMaster] (Id)

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'EOVisit'
	AND		CONSTRAINT_NAME = 'FK_EOVisit_Calender_CalendarEventId'
)
BEGIN
	ALTER TABLE [dbo].[EOVisit] DROP CONSTRAINT FK_EOVisit_Calender_CalendarEventId
END

ALTER TABLE [dbo].[EOVisit] ADD CONSTRAINT FK_EOVisit_Calender_CalendarEventId FOREIGN KEY (CalendarEventId)
    REFERENCES [dbo].[CalendarEvent] (Id)


IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'EOVisit'
	AND		CONSTRAINT_NAME = 'FK_EOVisit_VisitStatus_VisitStatusId'
)
BEGIN
	ALTER TABLE [dbo].[EOVisit] DROP CONSTRAINT FK_EOVisit_VisitStatus_VisitStatusId
END

ALTER TABLE [dbo].[EOVisit] ADD CONSTRAINT FK_EOVisit_VisitStatus_VisitStatusId FOREIGN KEY (VisitStatusId)
    REFERENCES [dbo].[VisitStatus](id)

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'EOVisit'
	AND		CONSTRAINT_NAME = 'FK_EOVisit_MedicalProvider_MedicalProviderId'
)
BEGIN
	ALTER TABLE [dbo].[EOVisit] DROP CONSTRAINT [FK_EOVisit_MedicalProvider_MedicalProviderId]
END

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'EOVisit'
	AND		COLUMN_NAME = 'VisitCreatedByCompanyId'
)
BEGIN
	PRINT 'Table [dbo].[EOVisit] already have a Column [VisitCreatedByCompanyId] in database: ' + DB_NAME()
END
ELSE
BEGIN
	ALTER TABLE [dbo].[EOVisit] ADD [VisitCreatedByCompanyId] INT NULL

    --UPDATE [dbo].[EOVisit] SET [VisitCreatedByCompanyId] = [MedicalProviderId]

    --ALTER TABLE [dbo].[EOVisit] 
    --    ALTER COLUMN [VisitCreatedByCompanyId] INT NOT NULL

    --ALTER TABLE [dbo].[EOVisit] 
    --    DROP COLUMN [MedicalProviderId]
END

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'EOVisit'
	AND		COLUMN_NAME = 'MedicalProviderId'
)
BEGIN
	UPDATE [dbo].[EOVisit] SET [VisitCreatedByCompanyId] = [MedicalProviderId]
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'EOVisit'
	AND		COLUMN_NAME = 'VisitCreatedByCompanyId'
)
BEGIN
	ALTER TABLE [dbo].[EOVisit] ALTER COLUMN [VisitCreatedByCompanyId] INT NOT NULL
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'EOVisit'
	AND		COLUMN_NAME = 'MedicalProviderId'
)
BEGIN
	ALTER TABLE [dbo].[EOVisit] DROP COLUMN [MedicalProviderId]
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'EOVisit'
	AND		CONSTRAINT_NAME = 'FK_EOVisit_Company_VisitCreatedByCompanyId'
)
BEGIN
	ALTER TABLE [dbo].[EOVisit] DROP CONSTRAINT [FK_EOVisit_Company_VisitCreatedByCompanyId]
END

ALTER TABLE [dbo].[EOVisit] ADD CONSTRAINT [FK_EOVisit_Company_VisitCreatedByCompanyId] FOREIGN KEY ([VisitCreatedByCompanyId])
    REFERENCES [dbo].[Company]([id])

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'EOVisit'
	AND		COLUMN_NAME = 'PatientId'
)
BEGIN
	PRINT 'Table [dbo].[EOVisit] already have a Column [PatientId] in database: ' + DB_NAME()
END
ELSE
BEGIN
	ALTER TABLE [dbo].[EOVisit] ADD [PatientId] INT NULL
END

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'EOVisit'
	AND		CONSTRAINT_NAME = 'FK_EOVisit_Patient_PatientId'
)
BEGIN
	ALTER TABLE [dbo].[EOVisit] DROP CONSTRAINT [FK_EOVisit_Patient_PatientId]
END
GO

ALTER TABLE [dbo].[EOVisit] ADD CONSTRAINT [FK_EOVisit_Patient_PatientId] FOREIGN KEY ([PatientId])
    REFERENCES [dbo].[Patient]([id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'EOVisit'
	AND		COLUMN_NAME = 'CaseId'
)
BEGIN
	PRINT 'Table [dbo].[EOVisit] already have a Column [CaseId] in database: ' + DB_NAME()
END
ELSE
BEGIN
	ALTER TABLE [dbo].[EOVisit] ADD [CaseId] INT NULL
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'EOVisit'
	AND		CONSTRAINT_NAME = 'FK_EOVisit_Case_CaseId'
)
BEGIN
	ALTER TABLE [dbo].[EOVisit] DROP CONSTRAINT [FK_EOVisit_Case_CaseId]
END
GO

ALTER TABLE [dbo].[EOVisit] ADD CONSTRAINT [FK_EOVisit_Case_CaseId] FOREIGN KEY ([CaseId])
    REFERENCES [dbo].[Case]([id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'EOVisit'
	AND		COLUMN_NAME = 'CaseId'
)
BEGIN
	UPDATE [dbo].[EOVisit] SET [CaseId] = (SELECT TOP 1 [Id] FROM [dbo].[Case] WHERE [PatientId] = [dbo].[EOVisit].[PatientId]
        AND [dbo].[EOVisit].[CaseId] IS NULL AND [dbo].[EOVisit].[PatientId] IS NOT NULL)
END
GO