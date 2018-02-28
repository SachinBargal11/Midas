IF NOT EXISTS
(
	SELECT	1 
	FROM	INFORMATION_SCHEMA.TABLES
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'CaseDocuments'
)
BEGIN
    CREATE TABLE [dbo].[CaseDocuments]
    (
	    [Id] [int] IDENTITY(1,1) NOT NULL,
	    [CaseId] [int] NOT NULL,
	    [MidasDocumentId] [int] NOT NULL,
	    [DocumentName] [varchar](500) NULL,
	    [CreateDate] [datetime2](7) NULL,
	    [UpdateDate] [datetime2](7) NULL,
	    [CreateUserId] [int] NULL,
	    [UpdateUserId] [int] NULL,
	    [IsDeleted] [bit] NULL,
	    [DocumentType] [varchar](50) NULL,
        CONSTRAINT [PK_Case] PRIMARY KEY ([Id])
    )
END
ELSE
BEGIN
	PRINT 'Table [dbo].[CaseDocuments] already exists in database: ' + DB_NAME()
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'CaseDocuments'
	AND		CONSTRAINT_NAME = 'FK_CaseDocuments_Case_CaseId'
)
BEGIN
	ALTER TABLE [dbo].[CaseDocuments] DROP CONSTRAINT [FK_CaseDocuments_Case_CaseId]
END
GO

ALTER TABLE [dbo].[CaseDocuments]  WITH CHECK ADD  CONSTRAINT [FK_CaseDocuments_Case_CaseId] FOREIGN KEY([CaseId])
    REFERENCES [dbo].[Case] ([Id])

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'CaseDocuments'
	AND		CONSTRAINT_NAME = 'FK_CaseDocuments_MidasDocuments_MidasDocumentId'
)
BEGIN
	ALTER TABLE [dbo].[CaseDocuments] DROP CONSTRAINT [FK_CaseDocuments_MidasDocuments_MidasDocumentId]
END
GO

ALTER TABLE [dbo].[CaseDocuments] ADD CONSTRAINT [FK_CaseDocuments_MidasDocuments_MidasDocumentId] FOREIGN KEY([MidasDocumentId])
    REFERENCES [dbo].[MidasDocuments] ([Id])
GO
