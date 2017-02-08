CREATE TABLE [dbo].[PolicyOwner]
(
	[Id] [TINYINT] NOT NULL,
	[DisplayText] [NVARCHAR](50) NOT NULL,
	[IsDeleted] [BIT] NULL,
	--[CreateByUserID] [INT] NOT NULL,
	--[CreateDate] [DATETIME2](7) NOT NULL,
	--[UpdateByUserID] [INT] NULL,
	--[UpdateDate] [DATETIME2](7) NULL,
	CONSTRAINT [PK_PolicyOwner] PRIMARY KEY ([Id])
)
GO
/*
INSERT INTO [dbo].[PolicyOwner] ([Id], [DisplayText], [IsDeleted])
	VALUES (1, 'Self', 0), (2, 'Spous', 0), (3, 'Child', 0), (4, 'Other', 0)
*/