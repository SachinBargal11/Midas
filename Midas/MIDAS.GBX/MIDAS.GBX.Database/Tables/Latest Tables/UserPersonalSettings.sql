IF NOT EXISTS
(
	SELECT	1 
	FROM	INFORMATION_SCHEMA.TABLES
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'UserPersonalSettings'
)
BEGIN
    CREATE TABLE [dbo].[UserPersonalSettings]
    (	
        [Id] INT NOT NULL IDENTITY, 
        [UserId] INT NOT NULL, 
        [CompanyId] INT NOT NULL,
        [IsPublic] BIT NOT NULL CONSTRAINT [DF_UserPersonalSettings_IsPublic] DEFAULT 0, 
        [IsSearchable] BIT NOT NULL CONSTRAINT [DF_UserPersonalSettings_IsSearchable] DEFAULT 0, 
        [IsCalendarPublic] BIT NOT NULL CONSTRAINT [DF_UserPersonalSettings_IsCalendarPublic] DEFAULT 0,
        [SlotDuration] INT NOT NULL CONSTRAINT [DF_UserPersonalSettings_SlotDuration] DEFAULT 30, 
        [PreferredModeOfCommunication] INT NOT NULL CONSTRAINT [DF_UserPersonalSettings_PreferredModeOfCommunication] DEFAULT 3,
        [IsPushNotificationEnabled] BIT NOT NULL CONSTRAINT [DF_UserPersonalSettings_IsPushNotificationEnabled] DEFAULT 1,
        [CalendarViewId] [TINYINT] NOT NULL CONSTRAINT [DF_UserPersonalSettings_CalendarViewId] DEFAULT 1,
        [PreferredUIViewId] [TINYINT] NOT NULL CONSTRAINT [DF_UserPersonalSettings_PreferredUIViewId] DEFAULT 1,

        [IsDeleted] [bit] NULL DEFAULT 0,
        [CreateByUserID] [int] NOT NULL,
        [CreateDate] [datetime2](7) NOT NULL,
        [UpdateByUserID] [int] NULL,
        [UpdateDate] [datetime2](7) NULL, 
        CONSTRAINT [PK_UserPersonalSettings] PRIMARY KEY ([Id])
    )
END
ELSE
BEGIN
	PRINT 'Table [dbo].[UserPersonalSettings] already exists in database: ' + DB_NAME()
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'UserPersonalSettings'
	AND		CONSTRAINT_NAME = 'FK_UserPersonalSettings_Company_CompanyId'
)
BEGIN
	ALTER TABLE [dbo].[UserPersonalSettings] DROP CONSTRAINT [FK_UserPersonalSettings_Company_CompanyId]
END
GO

ALTER TABLE [dbo].[UserPersonalSettings] ADD CONSTRAINT [FK_UserPersonalSettings_Company_CompanyId] FOREIGN KEY([CompanyId])
    REFERENCES [dbo].[Company] ([id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'UserPersonalSettings'
	AND		CONSTRAINT_NAME = 'FK_UserPersonalSettings_User_UserId'
)
BEGIN
	ALTER TABLE [dbo].[UserPersonalSettings] DROP CONSTRAINT [FK_UserPersonalSettings_User_UserId]
END
GO

ALTER TABLE [dbo].[UserPersonalSettings] ADD CONSTRAINT [FK_UserPersonalSettings_User_UserId] FOREIGN KEY([UserId])
    REFERENCES [dbo].[User] ([id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'UserPersonalSettings'
	AND     COLUMN_NAME = 'PreferredModeOfCommunication'
)
BEGIN
    PRINT 'Table [dbo].[UserPersonalSettings] already have column [PreferredModeOfCommunication] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[UserPersonalSettings] ADD [PreferredModeOfCommunication] INT NOT NULL CONSTRAINT [DF_UserPersonalSettings_PreferredModeOfCommunication] DEFAULT 3
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'UserPersonalSettings'
	AND     COLUMN_NAME = 'IsPushNotificationEnabled'
)
BEGIN
    PRINT 'Table [dbo].[UserPersonalSettings] already have column [IsPushNotificationEnabled] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[UserPersonalSettings] ADD [IsPushNotificationEnabled] BIT NOT NULL CONSTRAINT [DF_UserPersonalSettings_IsPushNotificationEnabled] DEFAULT 1
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'UserPersonalSettings'
	AND     COLUMN_NAME = 'CalendarViewId'
)
BEGIN
    PRINT 'Table [dbo].[UserPersonalSettings] already have column [CalendarViewId] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[UserPersonalSettings] ADD [CalendarViewId] [TINYINT] NOT NULL CONSTRAINT [DF_UserPersonalSettings_CalendarViewId] DEFAULT 1
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'UserPersonalSettings'
	AND		CONSTRAINT_NAME = 'FK_UserPersonalSettings_CalendarView_CalendarViewId'
)
BEGIN
	ALTER TABLE [dbo].[UserPersonalSettings] DROP CONSTRAINT [FK_UserPersonalSettings_CalendarView_CalendarViewId]
END
GO

ALTER TABLE [dbo].[UserPersonalSettings] ADD CONSTRAINT [FK_UserPersonalSettings_CalendarView_CalendarViewId] FOREIGN KEY([CalendarViewId])
    REFERENCES [dbo].[CalendarView] ([id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'UserPersonalSettings'
	AND     COLUMN_NAME = 'PreferredUIViewId'
)
BEGIN
    PRINT 'Table [dbo].[UserPersonalSettings] already have column [PreferredUIViewId] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[UserPersonalSettings] ADD [PreferredUIViewId] [TINYINT] NOT NULL CONSTRAINT [DF_UserPersonalSettings_PreferredUIViewId] DEFAULT 1
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'UserPersonalSettings'
	AND		CONSTRAINT_NAME = 'FK_UserPersonalSettings_PreferredUIView_PreferredUIViewId'
)
BEGIN
	ALTER TABLE [dbo].[UserPersonalSettings] DROP CONSTRAINT [FK_UserPersonalSettings_PreferredUIView_PreferredUIViewId]
END
GO

ALTER TABLE [dbo].[UserPersonalSettings] ADD CONSTRAINT [FK_UserPersonalSettings_PreferredUIView_PreferredUIViewId] FOREIGN KEY([PreferredUIViewId])
    REFERENCES [dbo].[PreferredUIView] ([id])
GO
