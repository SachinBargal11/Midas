IF NOT EXISTS
(
	SELECT	1 
	FROM	INFORMATION_SCHEMA.TABLES
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientLanguagePreferenceMapping'
)
BEGIN
    CREATE TABLE [dbo].[PatientLanguagePreferenceMapping]
    (
        [Id] INT NOT NULL IDENTITY, 
        [PatientId] INT NOT NULL, 
        [LanguagePreferenceId] TINYINT NOT NULL,
        [IsDeleted] [BIT] NULL DEFAULT 0,
        [CreateByUserID] [int] NOT NULL,
	    [CreateDate] [datetime2](7) NOT NULL,
	    [UpdateByUserID] [int] NULL,
	    [UpdateDate] [datetime2](7) NULL, 
        CONSTRAINT [PK_PatientLanguagePreferenceMapping] PRIMARY KEY ([Id])
    )
END
ELSE
BEGIN
	PRINT 'Table [dbo].[PatientLanguagePreferenceMapping] already exists in database: ' + DB_NAME()
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientLanguagePreferenceMapping'
	AND		CONSTRAINT_NAME = 'FK_PatientLanguagePreferenceMapping_Patient_PatientId'
)
BEGIN
	ALTER TABLE [dbo].[PatientLanguagePreferenceMapping] 
        DROP CONSTRAINT [FK_PatientLanguagePreferenceMapping_Patient_PatientId]
END

ALTER TABLE [dbo].[PatientLanguagePreferenceMapping]  WITH CHECK ADD  CONSTRAINT [FK_PatientLanguagePreferenceMapping_Patient_PatientId] FOREIGN KEY([PatientId])
	REFERENCES [dbo].[Patient] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientLanguagePreferenceMapping'
	AND		CONSTRAINT_NAME = 'FK_PatientLanguagePreferenceMapping_LanguagePreference_LanguagePreferenceId'
)
BEGIN
	ALTER TABLE [dbo].[PatientLanguagePreferenceMapping] 
        DROP CONSTRAINT [FK_PatientLanguagePreferenceMapping_LanguagePreference_LanguagePreferenceId]
END

ALTER TABLE [dbo].[PatientLanguagePreferenceMapping]  WITH CHECK ADD  CONSTRAINT [FK_PatientLanguagePreferenceMapping_LanguagePreference_LanguagePreferenceId] FOREIGN KEY([LanguagePreferenceId])
	REFERENCES [dbo].[LanguagePreference] ([Id])
GO
