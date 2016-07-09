CREATE TABLE [dbo].[ApplicationSettings](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NULL,
	[Value] [nvarchar](1000) NULL,
	[Description] [nvarchar](200) NULL,
	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[ApplicationSettings]  WITH CHECK ADD  CONSTRAINT [FK_ApplicationSettings_User] FOREIGN KEY([CreateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[ApplicationSettings] CHECK CONSTRAINT [FK_ApplicationSettings_User]
GO

ALTER TABLE [dbo].[ApplicationSettings]  WITH CHECK ADD  CONSTRAINT [FK_ApplicationSettings_User1] FOREIGN KEY([UpdateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[ApplicationSettings] CHECK CONSTRAINT [FK_ApplicationSettings_User1]
GO


