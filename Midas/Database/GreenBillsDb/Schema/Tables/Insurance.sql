CREATE TABLE [dbo].[Insurance](
	[ID] [INT] IDENTITY(1,1) NOT NULL,
	[Name] [NVARCHAR](250) NULL,
	[Code] [NVARCHAR](20) NULL,
	[Priority_Billing] [BIT] NULL,
	[Paper_Authorization] [BIT] NULL,
	[Generate1500Forms] [BIT] NULL,
	[IsDeleted] [BIT] NULL,
	[CreateByUserID] [INT] NOT NULL,
	[CreateDate] [DATETIME] NULL,
	[UpdateByUserID] [INT] NULL,
	[UpdateDate] [DATETIME] NULL,
 CONSTRAINT [PK_Insurance] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Insurance]  WITH CHECK ADD  CONSTRAINT [FK_Insurance_Insurance] FOREIGN KEY([CreateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[Insurance] CHECK CONSTRAINT [FK_Insurance_Insurance]
GO

ALTER TABLE [dbo].[Insurance]  WITH CHECK ADD  CONSTRAINT [FK_Insurance_User] FOREIGN KEY([UpdateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[Insurance] CHECK CONSTRAINT [FK_Insurance_User]
GO

