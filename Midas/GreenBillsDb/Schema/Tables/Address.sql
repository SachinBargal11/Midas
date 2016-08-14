CREATE TABLE [dbo].[Address](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Address1] [nvarchar](512) NOT NULL,
	[Address2] [nvarchar](512) NULL,
	[City] [nvarchar](256) NOT NULL,
	[State] [nvarchar](256) NOT NULL,
	[ZipCode] [nvarchar](12) NULL,
	[Country] [nvarchar](20) NULL,
	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime] NULL,
 CONSTRAINT [PK__Address__091C2AFB23777351] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Address] ADD  CONSTRAINT [DF__Address__Name__1BFD2C07]  DEFAULT ('') FOR [Name]
GO

ALTER TABLE [dbo].[Address]  WITH CHECK ADD  CONSTRAINT [FK_Address_User] FOREIGN KEY([CreateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[Address] CHECK CONSTRAINT [FK_Address_User]
GO

ALTER TABLE [dbo].[Address]  WITH CHECK ADD  CONSTRAINT [FK_Address_User1] FOREIGN KEY([ID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[Address] CHECK CONSTRAINT [FK_Address_User1]
GO


