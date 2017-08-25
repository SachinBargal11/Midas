
IF NOT EXISTS
(
	SELECT	1 
	FROM	INFORMATION_SCHEMA.TABLES
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'IMEVisit'
)
BEGIN
	CREATE TABLE [dbo].[IMEVisit]
	(
		ID INT IDENTITY(1, 1) PRIMARY KEY,
		CaseId INT NULL,
		PatientId INT NULL,
		CalendarEventId INT NOT NULL,
		VisitStatusId INT NULL,
		EventStart DATETIME2(7) NULL,
		EventEnd DATETIME2(7) NULL,
		Notes NVARCHAR(250) NULL,
		TransportProviderId int NULL,
		IsDeleted BIT DEFAULT (0),
		CreateByUserID INT NOT NULL,
		CreateDate datetime2(7) NOT NULL,
		UpdateByUserID INT NULL,
		UpdateDate datetime2(7) NULL
	)
END
ELSE
BEGIN
	PRINT 'Table [dbo].[IMEVisit] already exists in database: ' + DB_NAME()
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'IMEVisit'
	AND		CONSTRAINT_NAME = 'FK_IMEVisit_Case_CaseId'
)
BEGIN
	ALTER TABLE [dbo].[IMEVisit]
	DROP CONSTRAINT FK_IMEVisit_Case_CaseId
END

ALTER TABLE [dbo].[IMEVisit]
ADD CONSTRAINT FK_IMEVisit_Case_CaseId FOREIGN KEY (CaseId)
REFERENCES [dbo].[Case](id)


IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'IMEVisit'
	AND		CONSTRAINT_NAME = 'FK_IMEVisit_Patient_PatientId'
)
BEGIN
	ALTER TABLE [dbo].[IMEVisit]
	DROP CONSTRAINT FK_IMEVisit_Patient_PatientId
END

ALTER TABLE [dbo].[IMEVisit]
ADD CONSTRAINT FK_IMEVisit_Patient_PatientId FOREIGN KEY (PatientId)
REFERENCES [dbo].[Patient](id)


IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'IMEVisit'
	AND		CONSTRAINT_NAME = 'FK_IMEVisit_Calender_CalendarEventId'
)
BEGIN
	ALTER TABLE [dbo].[IMEVisit]
	DROP CONSTRAINT FK_IMEVisit_Calender_CalendarEventId
END

ALTER TABLE [dbo].[IMEVisit]
ADD CONSTRAINT FK_IMEVisit_Calender_CalendarEventId FOREIGN KEY (CalendarEventId)
REFERENCES [dbo].[CalendarEvent] (Id)



IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'IMEVisit'
	AND		CONSTRAINT_NAME = 'FK_IMEVisit_Transport_TransportProviderId'
)
BEGIN
	ALTER TABLE [dbo].[IMEVisit]
	DROP CONSTRAINT FK_IMEVisit_Transport_TransportProviderId
END

ALTER TABLE [dbo].[IMEVisit]
ADD CONSTRAINT FK_IMEVisit_Transport_TransportProviderId FOREIGN KEY (TransportProviderId)
REFERENCES [dbo].[Company](id)

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'IMEVisit'
	AND		CONSTRAINT_NAME = 'FK_IMEVisit_VisitStatus_VisitStatusId'
)
BEGIN
	ALTER TABLE [dbo].[IMEVisit]
	DROP CONSTRAINT FK_IMEVisit_VisitStatus_VisitStatusId
END

ALTER TABLE [dbo].[IMEVisit]
ADD CONSTRAINT FK_IMEVisit_VisitStatus_VisitStatusId FOREIGN KEY (VisitStatusId)
REFERENCES [dbo].[VisitStatus](id)

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'IMEVisit'
	AND		COLUMN_NAME = 'DoctorName'
)
BEGIN
	PRINT 'Table [dbo].[IMEVisit] already have column [DoctorName] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[IMEVisit] ADD [DoctorName] VARCHAR(50) NULL
    UPDATE [dbo].[IMEVisit] SET [DoctorName] = ''
    ALTER TABLE [dbo].[IMEVisit] ALTER COLUMN [DoctorName] VARCHAR(50) NOT NULL
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'IMEVisit'
	AND		COLUMN_NAME <> 'VisitCreatedByCompanyId'
)
BEGIN
	ALTER TABLE [dbo].[IMEVisit] 
        ADD [VisitCreatedByCompanyId] INT NULL

    UPDATE [dbo].[IMEVisit] SET [VisitCreatedByCompanyId] = (SELECT TOP 1 [CompanyId] FROM [dbo].[CaseCompanyMapping] 
        WHERE [CaseId] = [dbo].[IMEVisit].[CaseId] AND [dbo].[CaseCompanyMapping].IsOriginator = 1)

    ALTER TABLE [dbo].[IMEVisit] 
        ALTER COLUMN [VisitCreatedByCompanyId] INT NOT NULL
END

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'IMEVisit'
	AND		CONSTRAINT_NAME = 'FK_IMEVisit_Company_VisitCreatedByCompanyId'
)
BEGIN
	ALTER TABLE [dbo].[IMEVisit]
	    DROP CONSTRAINT [FK_IMEVisit_Company_VisitCreatedByCompanyId]
END

ALTER TABLE [dbo].[IMEVisit] ADD CONSTRAINT [FK_IMEVisit_Company_VisitCreatedByCompanyId] FOREIGN KEY ([VisitCreatedByCompanyId])
    REFERENCES [dbo].[Company]([id])

