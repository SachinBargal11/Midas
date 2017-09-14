IF NOT EXISTS
(
	SELECT	1 
	FROM	INFORMATION_SCHEMA.TABLES
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Location'
)
BEGIN
    CREATE TABLE [dbo].[Location]
    (
	    [id] [int] IDENTITY(1,1) NOT NULL,
	    [Name] [nvarchar](100) NOT NULL,
	    [CompanyID] [int] NOT NULL,
	    [ScheduleID] [int] NULL,
	    [AddressInfoID] [int] NOT NULL,
	    [ContactInfoID] [int] NOT NULL,
	    [LocationType] [tinyint] NOT NULL,
	    [IsDefault] [bit] NOT NULL,
        [HandicapRamp] [BIT] NOT NULL CONSTRAINT [DF_Location_HandicapRamp]  DEFAULT 0,
        [StairsToOffice] [BIT] NOT NULL CONSTRAINT [DF_Location_StairsToOffice]  DEFAULT 0,
        [PublicTransportNearOffice] [BIT] NOT NULL CONSTRAINT [DF_Location_PublicTransportNearOffice]  DEFAULT 0,
	    [IsDeleted] [bit] NULL CONSTRAINT [DF_Location_IsDeleted]  DEFAULT ((0)),
	    [CreateByUserID] [int] NOT NULL,
	    [CreateDate] [datetime2](7) NOT NULL,
	    [UpdateByUserID] [int] NULL,
	    [UpdateDate] [datetime2](7) NULL,
        CONSTRAINT [PK_Location] PRIMARY KEY CLUSTERED ([id] ASC)
    )
END
ELSE
BEGIN
	PRINT 'Table [dbo].[Location] already exists in database: ' + DB_NAME()
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Location'
	AND		CONSTRAINT_NAME = 'FK_Location_AddressInfo'
)
BEGIN
	ALTER TABLE [dbo].[Location] DROP CONSTRAINT [FK_Location_AddressInfo]
END
GO

ALTER TABLE [dbo].[Location] ADD CONSTRAINT [FK_Location_AddressInfo] FOREIGN KEY([AddressInfoID])
    REFERENCES [dbo].[AddressInfo] ([id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Location'
	AND		CONSTRAINT_NAME = 'FK_Location_Company'
)
BEGIN
	ALTER TABLE [dbo].[Location] DROP CONSTRAINT [FK_Location_Company]
END
GO

ALTER TABLE [dbo].[Location]  WITH CHECK ADD  CONSTRAINT [FK_Location_Company] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[Company] ([id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Location'
	AND		CONSTRAINT_NAME = 'FK_Location_ContactInfo'
)
BEGIN
	ALTER TABLE [dbo].[Location] DROP CONSTRAINT [FK_Location_ContactInfo]
END
GO

ALTER TABLE [dbo].[Location]  WITH CHECK ADD  CONSTRAINT [FK_Location_ContactInfo] FOREIGN KEY([ContactInfoID])
    REFERENCES [dbo].[ContactInfo] ([id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Location'
	AND		CONSTRAINT_NAME = 'FK_Location_Schedule'
)
BEGIN
	ALTER TABLE [dbo].[Location] DROP CONSTRAINT [FK_Location_Schedule]
END
GO

ALTER TABLE [dbo].[Location]  WITH CHECK ADD  CONSTRAINT [FK_Location_Schedule] FOREIGN KEY([ScheduleID])
    REFERENCES [dbo].[Schedule] ([id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Location'
	AND		COLUMN_NAME = 'HandicapRamp'
)
BEGIN
	PRINT 'Table [dbo].[Location] already have a Column [HandicapRamp] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[Location] ADD [HandicapRamp] [BIT] NOT NULL CONSTRAINT [DF_Location_HandicapRamp]  DEFAULT 0
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Location'
	AND		COLUMN_NAME = 'StairsToOffice'
)
BEGIN
	PRINT 'Table [dbo].[Location] already have a Column [StairsToOffice] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[Location] ADD [StairsToOffice] [BIT] NOT NULL CONSTRAINT [DF_Location_StairsToOffice]  DEFAULT 0
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Location'
	AND		COLUMN_NAME = 'PublicTransportNearOffice'
)
BEGIN
	PRINT 'Table [dbo].[Location] already have a Column [PublicTransportNearOffice] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[Location] ADD [PublicTransportNearOffice] [BIT] NOT NULL CONSTRAINT [DF_Location_PublicTransportNearOffice]  DEFAULT 0
END
GO
