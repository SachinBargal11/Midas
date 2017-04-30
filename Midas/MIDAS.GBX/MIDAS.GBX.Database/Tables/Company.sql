CREATE TABLE [dbo].[Company](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Status] [tinyint] NOT NULL,
	[CompanyType] [int] NOT NULL,
	[SubscriptionPlanType] [int] NOT NULL,
	[TaxID] [nvarchar](10) NOT NULL,
	[AddressId] [int] NOT NULL,
	[ContactInfoID] [int] NOT NULL,
	[BlobStorageTypeId] [int] NOT NULL DEFAULT 1,
	[RegisteredByCompanyId] [INT] NULL,
	[RegistrationComplete] [BIT] NOT NULL CONSTRAINT [DF_Company_RegistrationComplete]  DEFAULT 0,
	[IsDeleted] [bit] NULL CONSTRAINT [DF_Company_IsDeleted]  DEFAULT 0,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
 CONSTRAINT [PK_Company] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Company]  WITH CHECK ADD  CONSTRAINT [FK_Company_AddressInfo] FOREIGN KEY([AddressId])
REFERENCES [dbo].[AddressInfo] ([id])
GO

ALTER TABLE [dbo].[Company] CHECK CONSTRAINT [FK_Company_AddressInfo]
GO

ALTER TABLE [dbo].[Company]  WITH CHECK ADD  CONSTRAINT [FK_Company_CompanyType] FOREIGN KEY([CompanyType])
REFERENCES [dbo].[CompanyType] ([id])
GO

ALTER TABLE [dbo].[Company] CHECK CONSTRAINT [FK_Company_CompanyType]
GO

ALTER TABLE [dbo].[Company]  WITH CHECK ADD  CONSTRAINT [FK_Company_ContactInfo] FOREIGN KEY([ContactInfoID])
REFERENCES [dbo].[ContactInfo] ([id])
GO

ALTER TABLE [dbo].[Company] CHECK CONSTRAINT [FK_Company_ContactInfo]
GO

ALTER TABLE [dbo].[Company]  WITH CHECK ADD  CONSTRAINT [FK_Company_SubscriptionPlan] FOREIGN KEY([SubscriptionPlanType])
REFERENCES [dbo].[SubscriptionPlan] ([id])
GO

ALTER TABLE [dbo].[Company] CHECK CONSTRAINT [FK_Company_SubscriptionPlan]
GO

ALTER TABLE [dbo].[Company]  WITH CHECK ADD CONSTRAINT [FK_Company_BlobStorageType_BlobStorageTypeId] FOREIGN KEY([BlobStorageTypeId])
	REFERENCES [dbo].[BlobStorageType] ([Id])
GO

ALTER TABLE [dbo].[Company] CHECK CONSTRAINT [FK_Company_BlobStorageType_BlobStorageTypeId]
GO

/*
ALTER TABLE [dbo].[Company] ADD [BlobStorageTypeId] [int] NOT NULL DEFAULT (1)

ALTER TABLE [dbo].[Company] ALTER COLUMN [BlobStorageTypeId] SET DEFAULT (1)
GO
*/
/*
ALTER TABLE [dbo].[Company] ADD [RegisteredByCompanyId] [INT] NULL
GO
ALTER TABLE [dbo].[Company] ADD [RegistrationComplete] [BIT] NULL CONSTRAINT [DF_Company_RegistrationComplete]  DEFAULT 0
GO
UPDATE [dbo].[Company] SET [RegistrationComplete] = 1
GO
ALTER TABLE [dbo].[Company] ALTER COLUMN [RegistrationComplete] [BIT] NOT NULL
GO
*/
