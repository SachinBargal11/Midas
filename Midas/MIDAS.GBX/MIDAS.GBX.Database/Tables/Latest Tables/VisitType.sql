CREATE TABLE [dbo].[VisitType]
(
    [Id] TINYINT NOT NULL IDENTITY(1, 1),
    [Name] NVARCHAR(50) NULL, 
    [Description] NVARCHAR(128) NULL, 
    [IsDeleted] [BIT] NULL DEFAULT 0,
	[CreateByUserID] [INT] NOT NULL,
	[CreateDate] [DATETIME2](7) NOT NULL,
	[UpdateByUserID] [INT] NULL,
	[UpdateDate] [DATETIME2](7) NULL,
    CONSTRAINT [PK_VisitType] PRIMARY KEY ([Id])
)
GO

/*
INSERT INTO [dbo].[VisitType] ([Name], [Description], [CreateByUserID], [CreateDate])
    VALUES ('IN', 'Initial', 1, GETDATE()), ('FL', 'Follow Up', 1, GETDATE()), ('RE', 'Re-eval', 1, GETDATE())
*/