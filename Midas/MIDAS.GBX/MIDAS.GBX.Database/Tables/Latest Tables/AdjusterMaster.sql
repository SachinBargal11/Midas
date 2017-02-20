CREATE TABLE [dbo].[AdjusterMaster]
(
	[Id] [INT] NOT NULL IDENTITY,
	[CompanyId] [INT] NULL,
	[InsuranceMasterId] [INT] NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[MiddleName] [nvarchar](50) NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[AddressInfoId] [INT] NULL,
	[ContactInfoId] [INT] NULL,

	[IsDeleted] [bit] NULL DEFAULT 0,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL, 
    CONSTRAINT [PK_AdjusterMaster] PRIMARY KEY ([Id])
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AdjusterMaster]  WITH CHECK ADD  CONSTRAINT [FK_AdjusterMaster_Company_CompanyId] FOREIGN KEY([CompanyId])
	REFERENCES [dbo].[Company] ([Id])
GO

ALTER TABLE [dbo].[AdjusterMaster] CHECK CONSTRAINT [FK_AdjusterMaster_Company_CompanyId]
GO

ALTER TABLE [dbo].[AdjusterMaster]  WITH CHECK ADD  CONSTRAINT [FK_AdjusterMaster_InsuranceMaster_InsuranceMasterId] FOREIGN KEY([InsuranceMasterId])
	REFERENCES [dbo].[InsuranceMaster] ([Id])
GO

ALTER TABLE [dbo].[AdjusterMaster] CHECK CONSTRAINT [FK_AdjusterMaster_InsuranceMaster_InsuranceMasterId]
GO

ALTER TABLE [dbo].[AdjusterMaster]  WITH CHECK ADD  CONSTRAINT [FK_AdjusterMaster_AddressInfo_AddressInfoId] FOREIGN KEY([AddressInfoId])
	REFERENCES [dbo].[AddressInfo] ([Id])
GO

ALTER TABLE [dbo].[AdjusterMaster] CHECK CONSTRAINT [FK_AdjusterMaster_AddressInfo_AddressInfoId]
GO

ALTER TABLE [dbo].[AdjusterMaster]  WITH CHECK ADD  CONSTRAINT [FK_AdjusterMaster_AddressInfo_ContactInfoId] FOREIGN KEY([ContactInfoId])
	REFERENCES [dbo].[ContactInfo] ([Id])
GO

ALTER TABLE [dbo].[AdjusterMaster] CHECK CONSTRAINT [FK_AdjusterMaster_AddressInfo_ContactInfoId]
GO