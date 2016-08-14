
CREATE TABLE [dbo].[EmailTemplate](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Body] [varchar](max) NULL,
	[IsHTML] [bit] NULL,
	[ProfileID] [int] NULL,
	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime] NULL,
 CONSTRAINT [PK_EmailTemplate] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO


ALTER TABLE [dbo].[EmailTemplate]  WITH CHECK ADD  CONSTRAINT [FK_EmailTemplate_User] FOREIGN KEY([CreateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[EmailTemplate] CHECK CONSTRAINT [FK_EmailTemplate_User]
GO

ALTER TABLE [dbo].[EmailTemplate]  WITH CHECK ADD  CONSTRAINT [FK_EmailTemplate_User1] FOREIGN KEY([UpdateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[EmailTemplate] CHECK CONSTRAINT [FK_EmailTemplate_User1]
GO


