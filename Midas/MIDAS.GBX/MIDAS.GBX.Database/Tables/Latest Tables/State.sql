CREATE TABLE [dbo].[State]
(
	[Id] INT NOT NULL,
	[StateCode] [NVARCHAR](2) NOT NULL UNIQUE,
	[StateText] [NVARCHAR](50) NOT NULL,
	[IsDeleted] [BIT] NULL,
	--[CreateByUserID] [INT] NOT NULL,
	--[CreateDate] [DATETIME2](7) NOT NULL,
	--[UpdateByUserID] [INT] NULL,
	--[UpdateDate] [DATETIME2](7) NULL,
    CONSTRAINT [PK_States] PRIMARY KEY ([id])
)
GO
