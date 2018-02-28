CREATE TABLE [dbo].[MaritalStatus]
(
	[Id] [TINYINT] NOT NULL,
	[StatusText] [NVARCHAR](50) NOT NULL,
	[IsDeleted] [BIT] NULL,
	--[CreateByUserID] [INT] NOT NULL,
	--[CreateDate] [DATETIME2](7) NOT NULL,
	--[UpdateByUserID] [INT] NULL,
	--[UpdateDate] [DATETIME2](7) NULL,
	CONSTRAINT [PK_MaritalStatus] PRIMARY KEY ([Id])
)
GO

/*
INSERT INTO [dbo].[MaritalStatus] ([Id], [StatusText], [IsDeleted])
	VALUES (1, 'Single', 0), (2, 'Married', 0)
*/