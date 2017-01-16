CREATE TABLE [dbo].[Gender]
(
	[Id] [TINYINT] NOT NULL,
	[GenderText] [NVARCHAR](50) NOT NULL,
	[IsDeleted] [BIT] NULL,
	--[CreateByUserID] [INT] NOT NULL,
	--[CreateDate] [DATETIME2](7) NOT NULL,
	--[UpdateByUserID] [INT] NULL,
	--[UpdateDate] [DATETIME2](7) NULL,
    CONSTRAINT [PK_Gender] PRIMARY KEY ([Id])
)
GO
