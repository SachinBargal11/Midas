CREATE TABLE [dbo].[Relations]
(
	[Id] TINYINT NOT NULL, 
	[RelationText] NVARCHAR(50) NOT NULL, 
	[IsDeleted] [BIT] NULL,
	--[CreateByUserID] [INT] NOT NULL,
	--[CreateDate] [DATETIME2](7) NOT NULL,
	--[UpdateByUserID] [INT] NULL,
	--[UpdateDate] [DATETIME2](7) NULL,
    CONSTRAINT [PK_Relations] PRIMARY KEY ([Id])
)
GO

/*
INSERT INTO [dbo].[Relations] ([Id], [RelationText], [IsDeleted])
	VALUES (1, 'Father', 0), (2, 'Mother', 0), (3, 'Sister', 0), (4, 'Brother', 0)
*/