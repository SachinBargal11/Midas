CREATE TABLE [dbo].[CaseStatus]
(
	[Id] [TINYINT] NOT NULL,
	[CaseStatusText] [NVARCHAR](50) NOT NULL,
	[IsDeleted] [BIT] NULL,
	--[CreateByUserID] [INT] NOT NULL,
	--[CreateDate] [DATETIME2](7) NOT NULL,
	--[UpdateByUserID] [INT] NULL,
	--[UpdateDate] [DATETIME2](7) NULL,
	CONSTRAINT [PK_CaseStatus] PRIMARY KEY ([Id])
)
GO
/*
INSERT INTO [dbo].[CaseStatus] ([Id], [CaseStatusText], [IsDeleted])
	VALUES (1, 'Open', 0), (2, 'Close', 0)
*/