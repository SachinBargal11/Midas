IF NOT EXISTS
(
	SELECT	1 
	FROM	INFORMATION_SCHEMA.TABLES
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'LanguagePreference'
)
BEGIN
    CREATE TABLE [dbo].[LanguagePreference]
    (
        [Id] TINYINT NOT NULL IDENTITY, 
        [Name] NVARCHAR(128) NOT NULL,
        [IsDeleted] [BIT] NULL DEFAULT 0,
	    [CreateByUserID] [int] NOT NULL,
	    [CreateDate] [datetime2](7) NOT NULL,
	    [UpdateByUserID] [int] NULL,
	    [UpdateDate] [datetime2](7) NULL, 
        CONSTRAINT [PK_LanguagePreference] PRIMARY KEY ([Id])
    )
END
ELSE
BEGIN
	PRINT 'Table [dbo].[LanguagePreference] already exists in database: ' + DB_NAME()
END
GO

INSERT INTO [dbo].[LanguagePreference] ([Name], [CreateByUserID], [CreateDate])
    VALUES ('English', 1, GETDATE()), ('Spanish', 1, GETDATE()), ('Other', 1, GETDATE())
GO
