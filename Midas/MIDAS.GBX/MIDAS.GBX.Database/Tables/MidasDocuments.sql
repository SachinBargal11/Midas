CREATE TABLE [dbo].[MidasDocuments](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ObjectType] [varchar](50) NULL,
	[ObjectId] [int] NOT NULL,
	[DocumentPath] [varchar](5000) NULL,
	[DocumentName] [varchar](500) NULL,
	[CreateDate] [datetime2](7) NULL,
	[UpdateDate] [datetime2](7) NULL,
	[CreateUserId] [int] NULL,
	[UpdateUserId] [int] NULL,
	[IsDeleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
