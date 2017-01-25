CREATE TABLE [dbo].[User](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](100) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[MiddleName] [nvarchar](50) NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[Gender] [tinyint] NULL,
	[UserType] [tinyint] NOT NULL,
	[UserStatus] [tinyint] NULL,
	[ImageLink] [nvarchar](200) NULL,
	[AddressId] [int] NOT NULL,
	[ContactInfoId] [int] NOT NULL,
	[DateOfBirth] [datetime2](7) NULL,
	[Password] [varchar](2000) NULL,
	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_AddressInfo] FOREIGN KEY([AddressId])
REFERENCES [dbo].[AddressInfo] ([id])
GO

ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_AddressInfo]
GO

ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_ContactInfo] FOREIGN KEY([ContactInfoId])
REFERENCES [dbo].[ContactInfo] ([id])
GO

ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_ContactInfo]
GO

ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_UserType] FOREIGN KEY([UserType])
REFERENCES [dbo].[UserType] ([id])
GO

ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_UserType]
GO
