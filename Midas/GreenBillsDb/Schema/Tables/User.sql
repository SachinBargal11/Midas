CREATE TABLE [dbo].[User](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[AccountID] [int] NULL,
	[UserName] [nvarchar](100) NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[MiddleName] [nvarchar](50) NULL,
	[LastName] [nvarchar](50) NULL,
	[Gender] TINYINT NULL,
	[UserType] [tinyint] NOT NULL,
	[ImageLink] [nvarchar](512) NULL,
	[AddressId] [int] NULL,
	[ContactInfoId] [int] NULL,
	[DateOfBirth] [datetime] NULL,
	[Password] [nvarchar](500) NULL,
	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime] NULL,
 CONSTRAINT [PK__User__3214EC27B4079BC3] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_Account] FOREIGN KEY([AddressId])
REFERENCES [dbo].[Address] ([ID])
GO

ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_Account]
GO


GO

ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_Account]
GO

ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_Address] FOREIGN KEY([AddressId])
REFERENCES [dbo].[Address] ([ID])
GO

ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_Address]
GO

ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_ContactInfo] FOREIGN KEY([ContactInfoId])
REFERENCES [dbo].[ContactInfo] ([ID])
GO

ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_ContactInfo]
GO

ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_UserType] FOREIGN KEY([UserType])
REFERENCES [dbo].[UserType] ([ID])
GO

ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_UserType]
GO



--User Type-Front Desk,Employer,System Admin,Bo User,Staff
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'Reference from Account table',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'User',
    @level2type = N'COLUMN',
    @level2name = N'AccountID'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'User name to login into the system',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'User',
    @level2type = N'COLUMN',
    @level2name = N'UserName'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'Type of User:- Doctor,Desk,Employee',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'User',
    @level2type = N'COLUMN',
    @level2name = N'UserType'