CREATE TABLE [dbo].[Templates]
(
	[Id] [INT] NOT NULL IDENTITY,
	[TemplateType] NVARCHAR(50) NOT NULL,	
	[FileData] VARCHAR(MAX) NOT NULL, 

	[IsDeleted] [BIT] NULL,
	[CreateByUserID] [INT] NOT NULL,
	[CreateDate] [DATETIME2](7) NOT NULL,
	[UpdateByUserID] [INT] NULL,
	[UpdateDate] [DATETIME2](7) NULL,

    CONSTRAINT [PK_Templates] PRIMARY KEY ([Id])
)
GO
