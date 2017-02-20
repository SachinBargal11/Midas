CREATE TABLE [dbo].[InsuranceMaster]
(
	[Id] [INT] NOT NULL IDENTITY,
	[CompanyCode] NVARCHAR(10) NOT NULL,
	[CompanyName] NVARCHAR(100) NOT NULL,
	[AddressInfoId] [INT] NULL,
	[ContactInfoId] [INT] NULL,

	[IsDeleted] [bit] NULL DEFAULT 0,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL, 
    CONSTRAINT [PK_InsuranceMaster] PRIMARY KEY ([Id])
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[InsuranceMaster]  WITH CHECK ADD  CONSTRAINT [FK_InsuranceMaster_AddressInfo_AddressInfoId] FOREIGN KEY([AddressInfoId])
	REFERENCES [dbo].[AddressInfo] ([Id])
GO

ALTER TABLE [dbo].[InsuranceMaster] CHECK CONSTRAINT [FK_InsuranceMaster_AddressInfo_AddressInfoId]
GO

ALTER TABLE [dbo].[InsuranceMaster]  WITH CHECK ADD  CONSTRAINT [FK_InsuranceMaster_AddressInfo_ContactInfoId] FOREIGN KEY([ContactInfoId])
	REFERENCES [dbo].[ContactInfo] ([Id])
GO

ALTER TABLE [dbo].[InsuranceMaster] CHECK CONSTRAINT [FK_InsuranceMaster_AddressInfo_ContactInfoId]
GO