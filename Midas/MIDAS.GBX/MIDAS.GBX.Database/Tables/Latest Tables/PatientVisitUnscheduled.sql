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
        [SpecialtyId] INT NULL,
        [RoomTestId] INT NULL,
        [Notes] [NVARCHAR](512) NULL,
        [ReferralId] INT NULL,
        [OrignatorCompanyId] INT NOT NULL,

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

ALTER TABLE [dbo].[PatientVisitUnscheduled] ADD CONSTRAINT [FK_PatientVisitUnscheduled_Patient_PatientId] FOREIGN KEY([PatientId])
	REFERENCES [dbo].[Patient] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientVisitUnscheduled'
	AND		CONSTRAINT_NAME = 'FK_PatientVisitUnscheduled_Specialty_SpecialtyId'
)
BEGIN
	ALTER TABLE [dbo].[PatientVisitUnscheduled] 
        DROP CONSTRAINT [FK_PatientVisitUnscheduled_Specialty_SpecialtyId]
END
GO

ALTER TABLE [dbo].[PatientVisitUnscheduled] ADD CONSTRAINT [FK_PatientVisitUnscheduled_Specialty_SpecialtyId] FOREIGN KEY([SpecialtyId])
	REFERENCES [dbo].[Specialty] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientVisitUnscheduled'
	AND		CONSTRAINT_NAME = 'FK_PatientVisitUnscheduled_RoomTest_RoomTestId'
)
BEGIN
	ALTER TABLE [dbo].[PatientVisitUnscheduled] 
        DROP CONSTRAINT [FK_PatientVisitUnscheduled_RoomTest_RoomTestId]
END
GO

ALTER TABLE [dbo].[PatientVisitUnscheduled] ADD CONSTRAINT [FK_PatientVisitUnscheduled_RoomTest_RoomTestId] FOREIGN KEY([RoomTestId])
	REFERENCES [dbo].[RoomTest] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientVisitUnscheduled'
	AND		CONSTRAINT_NAME = 'FK_PatientVisitUnscheduled_Referral_ReferralId'
)
BEGIN
	ALTER TABLE [dbo].[PatientVisitUnscheduled] 
        DROP CONSTRAINT [FK_PatientVisitUnscheduled_Referral_ReferralId]
END
GO

ALTER TABLE [dbo].[PatientVisitUnscheduled] ADD CONSTRAINT [FK_PatientVisitUnscheduled_Referral_ReferralId] FOREIGN KEY([ReferralId])
	REFERENCES [dbo].[Referral] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientVisitUnscheduled'
	AND     COLUMN_NAME = 'OrignatorCompanyId'
)
BEGIN
    PRINT 'Table [dbo].[PatientVisitUnscheduled] already have column [OrignatorCompanyId] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[PatientVisitUnscheduled] ADD [OrignatorCompanyId] INT NULL
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientVisitUnscheduled'
	AND     COLUMN_NAME = 'OrignatorCompanyId' AND IS_NULLABLE = 'YES'
)
BEGIN
    UPDATE [dbo].[PatientVisitUnscheduled] SET [OrignatorCompanyId] = (SELECT TOP 1 [CompanyId] FROM [dbo].[CaseCompanyMapping] 
        WHERE [CaseId] = [dbo].[PatientVisitUnscheduled].[CaseId] AND [dbo].[CaseCompanyMapping].IsOriginator = 1)
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientVisitUnscheduled'
	AND     COLUMN_NAME = 'OrignatorCompanyId' AND IS_NULLABLE = 'YES'
)
BEGIN
    ALTER TABLE [dbo].[PatientVisitUnscheduled] ALTER COLUMN [OrignatorCompanyId] INT NOT NULL
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientVisitUnscheduled'
	AND		CONSTRAINT_NAME = 'FK_PatientVisitUnscheduled_Company_OrignatorCompanyId'
)
BEGIN
	ALTER TABLE [dbo].[PatientVisitUnscheduled]
	    DROP CONSTRAINT [FK_PatientVisitUnscheduled_Company_OrignatorCompanyId]
END

ALTER TABLE [dbo].[PatientVisitUnscheduled] ADD CONSTRAINT [FK_PatientVisitUnscheduled_Company_OrignatorCompanyId] FOREIGN KEY ([OrignatorCompanyId])
    REFERENCES [dbo].[Company]([id])
GO

