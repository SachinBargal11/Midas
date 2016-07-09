CREATE TABLE [dbo].[EmailFields](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[FieldName] [varchar](50) NULL,
	[SQLQuery] [varchar](200) NULL,
	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime] NULL,
 CONSTRAINT [PK_EmailFields] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[EmailFields]  WITH CHECK ADD  CONSTRAINT [FK_EmailFields_User] FOREIGN KEY([CreateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[EmailFields] CHECK CONSTRAINT [FK_EmailFields_User]
GO

ALTER TABLE [dbo].[EmailFields]  WITH CHECK ADD  CONSTRAINT [FK_EmailFields_User1] FOREIGN KEY([UpdateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[EmailFields] CHECK CONSTRAINT [FK_EmailFields_User1]
GO


