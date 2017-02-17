CREATE TABLE [dbo].[CaseType]
(
	[Id] [TINYINT] NOT NULL,
	[CaseTypeText] [NVARCHAR](50) NOT NULL,
	[IsDeleted] [BIT] NULL,
	--[CreateByUserID] [INT] NOT NULL,
	--[CreateDate] [DATETIME2](7) NOT NULL,
	--[UpdateByUserID] [INT] NULL,
	--[UpdateDate] [DATETIME2](7) NULL,
	CONSTRAINT [PK_CaseType] PRIMARY KEY ([Id])
)
GO
/*
INSERT INTO [dbo].[CaseType] ([Id], [CaseTypeText], [IsDeleted])
	VALUES (1, 'Nofault', 0), (2, 'WC', 0), (3, 'Private', 0), (4, 'Lien', 0)
*/