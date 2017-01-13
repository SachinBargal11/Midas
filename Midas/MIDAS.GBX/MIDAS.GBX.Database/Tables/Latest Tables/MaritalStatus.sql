CREATE TABLE [dbo].[MaritalStatus]
(
	[Id] [INT] NOT NULL,
	[StatusText] [NVARCHAR](15) NOT NULL,
	[IsDeleted] [BIT] NULL,
	--[CreateByUserID] [INT] NOT NULL,
	--[CreateDate] [DATETIME2](7) NOT NULL,
	--[UpdateByUserID] [INT] NULL,
	--[UpdateDate] [DATETIME2](7) NULL,
	CONSTRAINT [PK_MaritalStatus] PRIMARY KEY ([id])
)
GO
