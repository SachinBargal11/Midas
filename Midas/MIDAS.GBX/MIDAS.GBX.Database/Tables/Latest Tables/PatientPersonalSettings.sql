IF NOT EXISTS
(
	SELECT	1 
	FROM	INFORMATION_SCHEMA.TABLES
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientPersonalSettings'
)
BEGIN
    CREATE TABLE [dbo].[PatientPersonalSettings]
    (
        [Id] INT NOT NULL IDENTITY, 
        [PatientId] INT NOT NULL,
        [PreferredModeOfCommunication] INT NOT NULL CONSTRAINT [DF_PatientPersonalSettings_PreferredModeOfCommunication] DEFAULT 3,
        [IsPushNotificationEnabled] BIT NOT NULL CONSTRAINT [DF_PatientPersonalSettings_IsPushNotificationEnabled] DEFAULT 1,
        [CalendarViewId] [TINYINT] NOT NULL CONSTRAINT [DF_PatientPersonalSettings_CalendarViewId] DEFAULT 1,
        [PreferredUIViewId] [TINYINT] NOT NULL CONSTRAINT [DF_PatientPersonalSettings_PreferredUIViewId] DEFAULT 1,

        [IsDeleted] [bit] NULL DEFAULT 0,
        [CreateByUserID] [int] NOT NULL,
        [CreateDate] [datetime2](7) NOT NULL,
        [UpdateByUserID] [int] NULL,
        [UpdateDate] [datetime2](7) NULL, 
        CONSTRAINT [PK_PatientPersonalSettings] PRIMARY KEY ([Id])
    )
END
ELSE
BEGIN
	PRINT 'Table [dbo].[PatientPersonalSettings] already exists in database: ' + DB_NAME()
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientPersonalSettings'
	AND		CONSTRAINT_NAME = 'FK_PatientPersonalSettings_Patient_PatientId'
)
BEGIN
	ALTER TABLE [dbo].[PatientPersonalSettings] DROP CONSTRAINT [FK_PatientPersonalSettings_Patient_PatientId]
END
GO

ALTER TABLE [dbo].[PatientPersonalSettings] ADD CONSTRAINT [FK_PatientPersonalSettings_Patient_PatientId] FOREIGN KEY([PatientId])
    REFERENCES [dbo].[Patient] ([id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientPersonalSettings'
	AND		CONSTRAINT_NAME = 'FK_PatientPersonalSettings_CalendarView_CalendarViewId'
)
BEGIN
	ALTER TABLE [dbo].[PatientPersonalSettings] DROP CONSTRAINT [FK_PatientPersonalSettings_CalendarView_CalendarViewId]
END
GO

ALTER TABLE [dbo].[PatientPersonalSettings] ADD CONSTRAINT [FK_PatientPersonalSettings_CalendarView_CalendarViewId] FOREIGN KEY([CalendarViewId])
    REFERENCES [dbo].[CalendarView] ([id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientPersonalSettings'
	AND		CONSTRAINT_NAME = 'FK_PatientPersonalSettings_PreferredUIView_PreferredUIViewId'
)
BEGIN
	ALTER TABLE [dbo].PatientPersonalSettings DROP CONSTRAINT [FK_PatientPersonalSettings_PreferredUIView_PreferredUIViewId]
END
GO

ALTER TABLE [dbo].[PatientPersonalSettings] ADD CONSTRAINT [FK_PatientPersonalSettings_PreferredUIView_PreferredUIViewId] FOREIGN KEY([PreferredUIViewId])
    REFERENCES [dbo].[PreferredUIView] ([id])
GO
