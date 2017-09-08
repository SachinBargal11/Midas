IF NOT EXISTS
(
	SELECT	1 
	FROM	INFORMATION_SCHEMA.TABLES
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'SocialMedia'
)
BEGIN
    CREATE TABLE [dbo].[SocialMedia]
    (
        [Id] TINYINT NOT NULL IDENTITY, 
        [Name] NVARCHAR(128) NOT NULL,
        [IsDeleted] [BIT] NULL DEFAULT 0,
        [CreateByUserID] [int] NOT NULL,
	    [CreateDate] [datetime2](7) NOT NULL,
	    [UpdateByUserID] [int] NULL,
	    [UpdateDate] [datetime2](7) NULL, 
        CONSTRAINT [PK_SocialMedia] PRIMARY KEY ([Id])
    )
END
ELSE
BEGIN
	PRINT 'Table [dbo].[SocialMedia] already exists in database: ' + DB_NAME()
END
GO

INSERT INTO [dbo].[SocialMedia] ([Name], [CreateByUserID], [CreateDate])
    VALUES ('Facebook', 1, GETDATE()), ('Twitter', 1, GETDATE()), ('Myspace', 1, GETDATE()), ('Instagram', 1, GETDATE()), ('Linked In', 1, GETDATE()) 
GO
