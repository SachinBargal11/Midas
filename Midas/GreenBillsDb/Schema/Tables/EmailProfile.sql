CREATE TABLE [dbo].[EmailProfile](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ProfileName] [varchar](20) NULL,
	[SMTPServer] [varchar](50) NULL,
	[SMTPPort] [int] NULL,
	[SSLEnabled] [bit] NULL,
	[AuthenticationUsername] [varchar](50) NULL,
	[Password] [varchar](50) NULL,
	[SMTPAuthenticationRequired] [bit] NOT NULL,
	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime] NULL,
 CONSTRAINT [PK_EmailProfile] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[EmailProfile]  WITH CHECK ADD  CONSTRAINT [FK_EmailProfile_User] FOREIGN KEY([CreateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[EmailProfile] CHECK CONSTRAINT [FK_EmailProfile_User]
GO

ALTER TABLE [dbo].[EmailProfile]  WITH CHECK ADD  CONSTRAINT [FK_EmailProfile_User1] FOREIGN KEY([UpdateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[EmailProfile] CHECK CONSTRAINT [FK_EmailProfile_User1]
GO


