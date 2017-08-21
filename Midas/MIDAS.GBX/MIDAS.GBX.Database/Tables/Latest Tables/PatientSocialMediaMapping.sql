IF NOT EXISTS
(
	SELECT	1 
	FROM	INFORMATION_SCHEMA.TABLES
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientSocialMediaMapping'
)
BEGIN
    CREATE TABLE [dbo].[PatientSocialMediaMapping]
    (
        [Id] INT NOT NULL IDENTITY, 
        [PatientId] INT NOT NULL, 
        [SocialMediaId] TINYINT NOT NULL,
        [CreateByUserID] [int] NOT NULL,
	    [CreateDate] [datetime2](7) NOT NULL,
	    [UpdateByUserID] [int] NULL,
	    [UpdateDate] [datetime2](7) NULL, 
        CONSTRAINT [PK_PatientSocialMediaMapping] PRIMARY KEY ([Id])
    )
END
ELSE
BEGIN
	PRINT 'Table [dbo].[PatientSocialMediaMapping] already exists in database: ' + DB_NAME()
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientSocialMediaMapping'
	AND		CONSTRAINT_NAME = 'FK_PatientSocialMediaMapping_Patient_PatientId'
)
BEGIN
	ALTER TABLE [dbo].[PatientSocialMediaMapping] 
        DROP CONSTRAINT [FK_PatientSocialMediaMapping_Patient_PatientId]
END

ALTER TABLE [dbo].[PatientSocialMediaMapping]  WITH CHECK ADD  CONSTRAINT [FK_PatientSocialMediaMapping_Patient_PatientId] FOREIGN KEY([PatientId])
	REFERENCES [dbo].[Patient] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientSocialMediaMapping'
	AND		CONSTRAINT_NAME = 'FK_PatientSocialMediaMapping_SocialMedia_SocialMediaId'
)
BEGIN
	ALTER TABLE [dbo].[PatientSocialMediaMapping] 
        DROP CONSTRAINT [FK_PatientSocialMediaMapping_SocialMedia_SocialMediaId]
END

ALTER TABLE [dbo].[PatientSocialMediaMapping]  WITH CHECK ADD  CONSTRAINT [FK_PatientSocialMediaMapping_SocialMedia_SocialMediaId] FOREIGN KEY([SocialMediaId])
	REFERENCES [dbo].[SocialMedia] ([Id])
GO
