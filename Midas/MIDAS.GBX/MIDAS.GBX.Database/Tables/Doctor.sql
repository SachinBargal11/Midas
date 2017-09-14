IF NOT EXISTS
(
	SELECT	1 
	FROM	INFORMATION_SCHEMA.TABLES
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Doctor'
)
BEGIN
    CREATE TABLE [dbo].[Doctor]
    (
	    [Id] [int] NOT NULL,
	    [LicenseNumber] [nvarchar](50) NULL,
	    [WCBAuthorization] [nvarchar](50) NULL,
	    [WcbRatingCode] [nvarchar](50) NULL,
	    [NPI] [nvarchar](50) NULL,
	    [Title] [nvarchar](10) NULL,
	    [IsDeleted] [bit] NULL CONSTRAINT [DF_Doctor_IsDeleted]  DEFAULT ((0)),
	    [CreateByUserID] [int] NOT NULL,
	    [CreateDate] [datetime2](7) NOT NULL,
	    [UpdateByUserID] [int] NULL,
	    [UpdateDate] [datetime2](7) NULL,
	    [IsCalendarPublic] [bit] NOT NULL,
	    [TaxTypeId] [tinyint] NULL,
        [GenderId] [TINYINT] NOT NULL,
        CONSTRAINT [PK_Doctor] PRIMARY KEY CLUSTERED ([Id] ASC)
    )
END
ELSE
BEGIN
	PRINT 'Table [dbo].[Doctor] already exists in database: ' + DB_NAME()
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Doctor'
	AND		CONSTRAINT_NAME = 'FK_Doctor_DoctorTaxType_TaxTypeId'
)
BEGIN
	ALTER TABLE [dbo].[Doctor] DROP CONSTRAINT [FK_Doctor_DoctorTaxType_TaxTypeId]
END
GO

ALTER TABLE [dbo].[Doctor]  WITH CHECK ADD  CONSTRAINT [FK_Doctor_DoctorTaxType_TaxTypeId] FOREIGN KEY([TaxTypeId])
    REFERENCES [dbo].[DoctorTaxType] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Doctor'
	AND		CONSTRAINT_NAME = 'FK_Doctor_User'
)
BEGIN
	ALTER TABLE [dbo].[Doctor] DROP CONSTRAINT [FK_Doctor_User]
END
GO

ALTER TABLE [dbo].[Doctor]  WITH CHECK ADD  CONSTRAINT [FK_Doctor_User] FOREIGN KEY([Id])
    REFERENCES [dbo].[User] ([id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Doctor'
	AND		COLUMN_NAME = 'GenderId'
)
BEGIN
	PRINT 'Table [dbo].[Doctor] already have a Column [GenderId] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[Doctor] ADD [GenderId] [TINYINT] NOT NULL DEFAULT 1
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'Doctor'
	AND		CONSTRAINT_NAME = 'FK_Doctor_Gender_GenderId'
)
BEGIN
	ALTER TABLE [dbo].[Doctor] DROP CONSTRAINT [FK_Doctor_Gender_GenderId]
END
GO

ALTER TABLE [dbo].[Doctor]  WITH CHECK ADD  CONSTRAINT [FK_Doctor_Gender_GenderId] FOREIGN KEY([GenderId])
    REFERENCES [dbo].[Gender] ([id])
GO
