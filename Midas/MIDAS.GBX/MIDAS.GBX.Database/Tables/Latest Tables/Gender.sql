CREATE TABLE [dbo].[Gender]
(
	[Id] INT NOT NULL,
	[GenderText] [NVARCHAR](50) NOT NULL,
	[IsDeleted] [BIT] NULL,
	--[CreateByUserID] [INT] NOT NULL,
	--[CreateDate] [DATETIME2](7) NOT NULL,
	--[UpdateByUserID] [INT] NULL,
	--[UpdateDate] [DATETIME2](7) NULL,
    CONSTRAINT [PK_Gender] PRIMARY KEY ([id])
)
GO
