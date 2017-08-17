IF NOT EXISTS
(
	SELECT	1 
	FROM	INFORMATION_SCHEMA.TABLES
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'AttorneyVisit'
)
BEGIN
    CREATE TABLE [dbo].[AttorneyVisit]
    (
        [Id] INT NOT NULL IDENTITY,
        [CalendarEventId] INT NOT NULL,
        [CaseId] INT NOT NULL, 
        [PatientId] INT NOT NULL, 
        [AttorneyId] INT NOT NULL, 
        [EventStart] DATETIME2 NULL, 
        [EventEnd] DATETIME2 NULL, 
        [Subject] NVARCHAR(256) NULL, 
        [VisitStatusId] TINYINT NULL, 
        [ContactPerson] NVARCHAR(128) NULL, 
        [CompanyId] [INT] NULL, 
        [Agenda] NVARCHAR(1024) NULL, 

        [IsDeleted] [bit] NULL DEFAULT 0,
	    [CreateByUserID] [int] NOT NULL,
	    [CreateDate] [datetime2](7) NOT NULL,
	    [UpdateByUserID] [int] NULL,
	    [UpdateDate] [datetime2](7) NULL, 
        CONSTRAINT [PK_AttorneyVisit] PRIMARY KEY ([Id])
    )
END
ELSE
BEGIN
	PRINT 'Table [dbo].[AttorneyVisit] already exists in database: ' + DB_NAME()
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'AttorneyVisit'
	AND		CONSTRAINT_NAME = 'FK_AttorneyVisit_CalendarEvent_CaseId'
)
BEGIN
	ALTER TABLE [dbo].[AttorneyVisit] 
        DROP CONSTRAINT [FK_AttorneyVisit_CalendarEvent_CaseId]
END

ALTER TABLE [dbo].[AttorneyVisit]  WITH CHECK ADD  CONSTRAINT [FK_AttorneyVisit_CalendarEvent_CaseId] FOREIGN KEY([CalendarEventId])
	REFERENCES [dbo].[CalendarEvent] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'AttorneyVisit'
	AND		CONSTRAINT_NAME = 'FK_AttorneyVisit_Case_CaseId'
)
BEGIN
	ALTER TABLE [dbo].[AttorneyVisit] 
        DROP CONSTRAINT [FK_AttorneyVisit_Case_CaseId]
END

ALTER TABLE [dbo].[AttorneyVisit]  WITH CHECK ADD  CONSTRAINT [FK_AttorneyVisit_Case_CaseId] FOREIGN KEY([CaseId])
	REFERENCES [dbo].[Case] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'AttorneyVisit'
	AND		CONSTRAINT_NAME = 'FK_AttorneyVisit_Patient_PatientId'
)
BEGIN
	ALTER TABLE [dbo].[AttorneyVisit] 
        DROP CONSTRAINT [FK_AttorneyVisit_Patient_PatientId]
END

ALTER TABLE [dbo].[AttorneyVisit]  WITH CHECK ADD  CONSTRAINT [FK_AttorneyVisit_Patient_PatientId] FOREIGN KEY([PatientId])
	REFERENCES [dbo].[Patient] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'AttorneyVisit'
	AND		CONSTRAINT_NAME = 'FK_AttorneyVisit_User_UserId'
)
BEGIN
	ALTER TABLE [dbo].[AttorneyVisit] 
        DROP CONSTRAINT [FK_AttorneyVisit_User_UserId]
END

ALTER TABLE [dbo].[AttorneyVisit]  WITH CHECK ADD  CONSTRAINT [FK_AttorneyVisit_User_UserId] FOREIGN KEY([AttorneyId])
	REFERENCES [dbo].[User] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'AttorneyVisit'
	AND		CONSTRAINT_NAME = 'FK_AttorneyVisit_Location_LocationID'
)
BEGIN
	ALTER TABLE [dbo].[AttorneyVisit] 
        DROP CONSTRAINT [FK_AttorneyVisit_Company_CompanyId]
END

ALTER TABLE [dbo].[AttorneyVisit]  WITH CHECK ADD  CONSTRAINT [FK_AttorneyVisit_Company_CompanyId] FOREIGN KEY([CompanyId])
	REFERENCES [dbo].[Company] ([Id])
GO
