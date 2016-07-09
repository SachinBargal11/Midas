CREATE TABLE [dbo].[Insurance](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NULL,
	[Code] [nvarchar](20) NULL,
	[ContactPerson] [nvarchar](20) NULL,
	[ContactInfoId] [int] NULL,
	[Priority_Billing] [bit] NULL,
	[Paper_Authorization] [bit] NULL,
	[Generate1500Forms] [bit] NULL,
	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime] NULL,
 CONSTRAINT [PK__Insuranc__3214EC2719B60047] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Insurance]  WITH CHECK ADD  CONSTRAINT [FK_Insurance_ContactInfo] FOREIGN KEY([ContactInfoId])
REFERENCES [dbo].[ContactInfo] ([ID])
GO

ALTER TABLE [dbo].[Insurance] CHECK CONSTRAINT [FK_Insurance_ContactInfo]
GO

ALTER TABLE [dbo].[Insurance]  WITH CHECK ADD  CONSTRAINT [FK_Insurance_Insurance] FOREIGN KEY([ID])
REFERENCES [dbo].[Insurance] ([ID])
GO

ALTER TABLE [dbo].[Insurance] CHECK CONSTRAINT [FK_Insurance_Insurance]
GO

ALTER TABLE [dbo].[Insurance]  WITH CHECK ADD  CONSTRAINT [FK_Insurance_User] FOREIGN KEY([UpdateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[Insurance] CHECK CONSTRAINT [FK_Insurance_User]
GO

ALTER TABLE [dbo].[Insurance]  WITH CHECK ADD  CONSTRAINT [FK_Insurance_User1] FOREIGN KEY([CreateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[Insurance] CHECK CONSTRAINT [FK_Insurance_User1]
GO


