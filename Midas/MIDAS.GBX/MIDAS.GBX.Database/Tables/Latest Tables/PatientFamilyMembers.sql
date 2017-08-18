IF NOT EXISTS
(
	SELECT	1 
	FROM	INFORMATION_SCHEMA.TABLES
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientFamilyMembers'
)
BEGIN
    CREATE TABLE [dbo].[PatientFamilyMembers]
    (
	    [Id] [int] IDENTITY(1,1) NOT NULL,
	    [PatientId] [int] NOT NULL,
	    [RelationId] [tinyint] NOT NULL,
	    [FullName] [nvarchar](50) NULL,
	    [FamilyName] [nvarchar](50) NULL,
	    [Prefix] [nvarchar](10) NULL,
	    [Sufix] [nvarchar](10) NULL,
	    [Age] [tinyint] NOT NULL,
	    [RaceId] [tinyint] NULL,
	    [EthnicitesId] [tinyint] NULL,
	    [GenderId] [tinyint] NOT NULL,
	    [CellPhone] [nvarchar](50) NULL,
	    [WorkPhone] [nvarchar](50) NULL,
	    [PrimaryContact] [bit] NULL DEFAULT ((0)),
	    [IsInActive] [bit] NULL DEFAULT ((0)),
	    [IsDeleted] [bit] NULL,
	    [CreateByUserID] [int] NOT NULL,
	    [CreateDate] [datetime2](7) NOT NULL,
	    [UpdateByUserID] [int] NULL,
	    [UpdateDate] [datetime2](7) NULL,
	    [FirstName] [nvarchar](50) NULL,
	    [MiddleName] [nvarchar](50) NULL,
	    [LastName] [nvarchar](50) NULL,
        CONSTRAINT [PK_PatientFamilyMembers] PRIMARY KEY ([Id])
    )
END
ELSE
BEGIN
	PRINT 'Table [dbo].[PatientFamilyMembers] already exists in database: ' + DB_NAME()
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientFamilyMembers'
	AND		CONSTRAINT_NAME = 'FK_PatientInsuranceInfo_Patient_PatientId'
)
BEGIN
    ALTER TABLE [dbo].[PatientFamilyMembers]  WITH CHECK ADD  CONSTRAINT [FK_PatientFamilyMembers_Patient_PatientId] FOREIGN KEY([PatientId])
	    REFERENCES [dbo].[Patient] ([Id])
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.COLUMNS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientFamilyMembers'
	AND		COLUMN_NAME = 'CaseId'
)
BEGIN
	PRINT 'Table [dbo].[PatientFamilyMembers] already have a Column [CaseId] in database: ' + DB_NAME()
END
ELSE
BEGIN
    ALTER TABLE [dbo].[PatientFamilyMembers] 
        ADD [CaseId] [int] NULL
    
    UPDATE [dbo].[PatientFamilyMembers] 
        SET [CaseId] = (SELECT TOP 1 [Id] FROM [dbo].[Case] WHERE [dbo].[Case].[PatientId] = [dbo].[PatientFamilyMembers].[PatientId])

    ALTER TABLE [dbo].[PatientFamilyMembers] 
        ALTER COLUMN [CaseId] [int] NOT NULL

    ALTER TABLE [dbo].[PatientFamilyMembers] 
        DROP COLUMN [PatientId]
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientFamilyMembers'
	AND		CONSTRAINT_NAME = 'FK_PatientFamilyMembers_Relations_RelationId'
)
BEGIN
	ALTER TABLE [dbo].[PatientFamilyMembers] 
        DROP CONSTRAINT [FK_PatientFamilyMembers_Relations_RelationId]
END

ALTER TABLE [dbo].[PatientFamilyMembers]  WITH CHECK ADD  CONSTRAINT [FK_PatientFamilyMembers_Relations_RelationId] FOREIGN KEY([RelationId])
	REFERENCES [dbo].[Relations] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'PatientFamilyMembers'
	AND		CONSTRAINT_NAME = 'FK_PatientFamilyMembers_Gender_GenderId'
)
BEGIN
	ALTER TABLE [dbo].[PatientFamilyMembers] 
        DROP CONSTRAINT [FK_PatientFamilyMembers_Gender_GenderId]
END

ALTER TABLE [dbo].[PatientFamilyMembers]  WITH CHECK ADD  CONSTRAINT [FK_PatientFamilyMembers_Gender_GenderId] FOREIGN KEY([GenderId])
	REFERENCES [dbo].[Gender] ([Id])
GO

--CREATE TABLE [dbo].[PatientFamilyMembers]
--(
--	[Id] INT NOT NULL IDENTITY(1,1),
--	[PatientId] INT NOT NULL,
--	[RelationId] TINYINT NOT NULL, 
--	[FullName] [NVARCHAR](50) NULL, 
--	[FamilyName] NVARCHAR(50) NULL, 
--    [Prefix] NVARCHAR(10) NULL,  
--	[Sufix] NVARCHAR(10) NULL, 
--	[Age] TINYINT NOT NULL, 
--    [RaceId] TINYINT NULL, 
--	[EthnicitesId] TINYINT NULL, 
--    [GenderId] TINYINT NOT NULL, 
--	[CellPhone] NVARCHAR(50) NULL , 
--	[WorkPhone] NVARCHAR(50) NULL,
--	[PrimaryContact] BIT NULL DEFAULT 0, 
--	[IsInActive] [BIT] NUll DEFAULT (0),

--	[IsDeleted] [bit] NULL,
--	[CreateByUserID] [int] NOT NULL,
--	[CreateDate] [datetime2](7) NOT NULL,
--	[UpdateByUserID] [int] NULL,
--	[UpdateDate] [datetime2](7) NULL,
--	CONSTRAINT [PK_PatientFamilyMembers] PRIMARY KEY ([Id])
--) ON [PRIMARY]
--GO

--ALTER TABLE [dbo].[PatientFamilyMembers]  WITH CHECK ADD  CONSTRAINT [FK_PatientFamilyMembers_Patient_PatientId] FOREIGN KEY([PatientId])
--	REFERENCES [dbo].[Patient] ([Id])
--GO

--ALTER TABLE [dbo].[PatientFamilyMembers] CHECK CONSTRAINT [FK_PatientFamilyMembers_Patient_PatientId]
--GO

--ALTER TABLE [dbo].[PatientFamilyMembers]  WITH CHECK ADD  CONSTRAINT [FK_PatientFamilyMembers_Relations_RelationId] FOREIGN KEY([RelationId])
--	REFERENCES [dbo].[Relations] ([Id])
--GO

--ALTER TABLE [dbo].[PatientFamilyMembers] CHECK CONSTRAINT [FK_PatientFamilyMembers_Relations_RelationId]
--GO

--ALTER TABLE [dbo].[PatientFamilyMembers]  WITH CHECK ADD  CONSTRAINT [FK_PatientFamilyMembers_Gender_GenderId] FOREIGN KEY([GenderId])
--	REFERENCES [dbo].[Gender] ([Id])
--GO

--ALTER TABLE [dbo].[PatientFamilyMembers] CHECK CONSTRAINT [FK_PatientFamilyMembers_Gender_GenderId]
--GO

--ALTER TABLE [dbo].[PatientFamilyMembers] ALTER COLUMN [FullName] [NVARCHAR](50) NULL
--GO
/*
ALTER TABLE [dbo].[PatientFamilyMembers] ADD [FirstName] [NVARCHAR](50) NULL
GO
ALTER TABLE [dbo].[PatientFamilyMembers] ADD [MiddleName] [NVARCHAR](50) NULL
GO
ALTER TABLE [dbo].[PatientFamilyMembers] ADD [LastName] [NVARCHAR](50) NULL
GO
*/
