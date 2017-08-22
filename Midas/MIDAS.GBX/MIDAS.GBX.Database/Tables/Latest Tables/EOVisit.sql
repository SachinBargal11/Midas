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
		ID INT IDENTITY(1, 1) PRIMARY KEY,
		DoctorId INT NULL,
		MedicalProviderId INT NULL,
		InsuranceProviderId INT NULL,
		CalendarEventId INT NOT NULL,
		VisitStatusId INT NULL,
		EventStart DATETIME2(7) NULL,
		EventEnd DATETIME2(7) NULL,
		Notes NVARCHAR(250) NULL,
		IsDeleted BIT DEFAULT (0),
		CreateByUserID INT NOT NULL,
		CreateDate datetime2(7) NOT NULL,
		UpdateByUserID INT NULL,
		UpdateDate datetime2(7) NULL
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
	ALTER TABLE [dbo].[EOVisit]
	DROP CONSTRAINT FK_EOVisit_Doctor_DoctorId
END

ALTER TABLE [dbo].[EOVisit]
ADD CONSTRAINT FK_EOVisit_Doctor_DoctorId FOREIGN KEY (DoctorId)
REFERENCES [dbo].[Doctor](id)


IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'EOVisit'
	AND		CONSTRAINT_NAME = 'FK_EOVisit_MedicalProvider_MedicalProviderId'
)
BEGIN
	ALTER TABLE [dbo].[EOVisit]
	DROP CONSTRAINT FK_EOVisit_MedicalProvider_MedicalProviderId
END

ALTER TABLE [dbo].[EOVisit]
ADD CONSTRAINT FK_EOVisit_MedicalProvider_MedicalProviderId FOREIGN KEY (MedicalProviderId)
REFERENCES [dbo].[Company](id)

--IF EXISTS
--(
--	SELECT	1
--	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
--	WHERE	TABLE_SCHEMA = 'dbo'
--	AND		TABLE_NAME = 'EOVisit'
--	AND		CONSTRAINT_NAME = 'FK_IMEVisit_Insurance_InsuranceProviderId'
--)
--BEGIN
--	ALTER TABLE [dbo].[EOVisit]
--	DROP CONSTRAINT FK_EOVisit_Insurance_InsuranceProviderId
--END

--ALTER TABLE [dbo].[EOVisit]
--ADD CONSTRAINT FK_EOVisit_Insurance_InsuranceProviderId FOREIGN KEY (InsuranceProviderId)
--REFERENCES [dbo].[Company] (Id)

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'EOVisit'
	AND		CONSTRAINT_NAME = 'FK_EOVisit_Insurance_InsuranceProviderId'
)
BEGIN
	ALTER TABLE [dbo].[EOVisit]
	    DROP CONSTRAINT FK_EOVisit_Insurance_InsuranceProviderId
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
	ALTER TABLE [dbo].[EOVisit]
	    DROP CONSTRAINT FK_EOVisit_InsuranceMaster_InsuranceProviderId
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
	ALTER TABLE [dbo].[EOVisit]
	DROP CONSTRAINT FK_EOVisit_Calender_CalendarEventId
END

ALTER TABLE [dbo].[EOVisit]
ADD CONSTRAINT FK_EOVisit_Calender_CalendarEventId FOREIGN KEY (CalendarEventId)
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
	ALTER TABLE [dbo].[EOVisit]
	DROP CONSTRAINT FK_EOVisit_VisitStatus_VisitStatusId
END

ALTER TABLE [dbo].[EOVisit]
ADD CONSTRAINT FK_EOVisit_VisitStatus_VisitStatusId FOREIGN KEY (VisitStatusId)
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
	ALTER TABLE [dbo].[EOVisit]
	    DROP CONSTRAINT [FK_EOVisit_MedicalProvider_MedicalProviderId]
END


IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'EOVisit'
	AND		COLUMN_NAME <> 'VisitCreatedByCompanyId'
)
BEGIN
	ALTER TABLE [dbo].[EOVisit] 
        ADD [VisitCreatedByCompanyId] INT NULL

    UPDATE [dbo].[EOVisit] SET [VisitCreatedByCompanyId] = [MedicalProviderId]

    ALTER TABLE [dbo].[EOVisit] 
        ALTER COLUMN [VisitCreatedByCompanyId] INT NOT NULL

    ALTER TABLE [dbo].[EOVisit] 
        DROP COLUMN [MedicalProviderId]
END


IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'EOVisit'
	AND		CONSTRAINT_NAME = 'FK_EOVisit_Company_VisitCreatedByCompanyId'
)
BEGIN
	ALTER TABLE [dbo].[EOVisit]
	    DROP CONSTRAINT [FK_EOVisit_Company_VisitCreatedByCompanyId]
END

ALTER TABLE [dbo].[EOVisit] ADD CONSTRAINT [FK_EOVisit_Company_VisitCreatedByCompanyId] FOREIGN KEY ([VisitCreatedByCompanyId])
    REFERENCES [dbo].[Company]([id])

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'EOVisit'
	AND		COLUMN_NAME <> 'PatientId'
)
BEGIN
	ALTER TABLE [dbo].[EOVisit] 
        ADD [PatientId] INT NULL
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
	ALTER TABLE [dbo].[EOVisit]
	    DROP CONSTRAINT [FK_EOVisit_Patient_PatientId]
END

ALTER TABLE [dbo].[EOVisit] ADD CONSTRAINT [FK_EOVisit_Patient_PatientId] FOREIGN KEY ([PatientId])
    REFERENCES [dbo].[Patient]([id])
