CREATE TABLE [dbo].[AttorneyMaster]
(
	[Id] [INT] NOT NULL IDENTITY,
	[CompanyId] [INT] NOT NULL,
	[FirstName] [NVARCHAR](50) NOT NULL,
	[MiddleName] [NVARCHAR](50) NULL,
	[LastName] [NVARCHAR](50) NOT NULL,
	--[Gender] [TINYINT] NULL,
	[AddressInfoId] [INT] NOT NULL,
	[ContactInfoId] [INT] NOT NULL,

	[IsDeleted] [BIT] NULL,
	[CreateByUserID] [INT] NOT NULL,
	[CreateDate] [DATETIME2](7) NOT NULL,
	[UpdateByUserID] [INT] NULL,
	[UpdateDate] [DATETIME2](7) NULL,

	CONSTRAINT [PK_AttorneyMaster] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[AttorneyMaster]  WITH CHECK ADD  CONSTRAINT [FK_AttorneyMaster_Company_CompanyId] FOREIGN KEY([CompanyId])
	REFERENCES [dbo].[Company] ([Id])
GO

ALTER TABLE [dbo].[AttorneyMaster] CHECK CONSTRAINT [FK_AttorneyMaster_Company_CompanyId]
GO

ALTER TABLE [dbo].[AttorneyMaster]  WITH CHECK ADD  CONSTRAINT [FK_AttorneyMaster_AddressInfo_AddressInfoId] FOREIGN KEY([AddressInfoId])
	REFERENCES [dbo].[AddressInfo] ([Id])
GO

ALTER TABLE [dbo].[AttorneyMaster] CHECK CONSTRAINT [FK_AttorneyMaster_AddressInfo_AddressInfoId]
GO

ALTER TABLE [dbo].[AttorneyMaster]  WITH CHECK ADD  CONSTRAINT [FK_AttorneyMaster_AddressInfo_ContactInfoId] FOREIGN KEY([ContactInfoId])
	REFERENCES [dbo].[ContactInfo] ([Id])
GO

ALTER TABLE [dbo].[AttorneyMaster] CHECK CONSTRAINT [FK_AttorneyMaster_AddressInfo_ContactInfoId]
GO
