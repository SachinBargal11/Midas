CREATE TABLE [dbo].[PatientInsuranceInfo]
(
	[Id] [int] NOT NULL IDENTITY,
	[PatientId] [int] NOT NULL,
	[PolicyHolderName] [NVARCHAR](50) NULL,
	[PolicyHolderAddressInfoId] [INT] NULL,
	[PolicyHolderContactInfoId] [INT] NULL,
	[PolicyOwnerId] [TINYINT] NULL,
	[InsuranceCompanyCode] [NVARCHAR](10) NULL,
	[InsuranceCompanyAddressInfoId] [INT] NULL,
	[InsuranceCompanyContactInfoId] [INT] NULL,
	[PolicyNo] [NVARCHAR](50) NULL,
	[ContactPerson] [NVARCHAR](50) NULL,
	[ClaimFileNo] [NVARCHAR](50) NULL,
	[WCBNo] [NVARCHAR](50) NULL,
	[InsuranceTypeId] [TINYINT] NULL,
	[IsInActive] [BIT] NUll DEFAULT (0),
	
	[IsDeleted] [bit] NULL DEFAULT (0),
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL, 
    CONSTRAINT [PK_PatientInsuranceInfo] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[PatientInsuranceInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientInsuranceInfo_Patient2_PatientId] FOREIGN KEY([PatientId])
	REFERENCES [dbo].[Patient2] ([id])
GO

ALTER TABLE [dbo].[PatientInsuranceInfo] CHECK CONSTRAINT [FK_PatientInsuranceInfo_Patient2_PatientId]	
GO

ALTER TABLE [dbo].[PatientInsuranceInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientInsuranceInfo_AddressInfo_PolicyHolderAddressInfoId] FOREIGN KEY([PolicyHolderAddressInfoId])
	REFERENCES [dbo].[AddressInfo] ([id])
GO

ALTER TABLE [dbo].[PatientInsuranceInfo] CHECK CONSTRAINT [FK_PatientInsuranceInfo_AddressInfo_PolicyHolderAddressInfoId]
GO

ALTER TABLE [dbo].[PatientInsuranceInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientInsuranceInfo_ContactInfo_PolicyHolderContactInfoId] FOREIGN KEY([PolicyHolderContactInfoId])
	REFERENCES [dbo].[ContactInfo] ([id])
GO

--ALTER TABLE [dbo].[PatientInsuranceInfo] ALTER COLUMN [PolicyOwnerId] [TINYINT] NULL 
GO
ALTER TABLE [dbo].[PatientInsuranceInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientInsuranceInfo_PolicyOwner_PolicyOwnerId] FOREIGN KEY([PolicyOwnerId])
	REFERENCES [dbo].[PolicyOwner] ([id])
GO

ALTER TABLE [dbo].[PatientInsuranceInfo] CHECK CONSTRAINT [FK_PatientInsuranceInfo_PolicyOwner_PolicyOwnerId]
GO

ALTER TABLE [dbo].[PatientInsuranceInfo] CHECK CONSTRAINT [FK_PatientInsuranceInfo_ContactInfo_PolicyHolderContactInfoId]
GO

ALTER TABLE [dbo].[PatientInsuranceInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientInsuranceInfo_AddressInfo_InsuranceCompanyAddressInfoId] FOREIGN KEY([InsuranceCompanyAddressInfoId])
	REFERENCES [dbo].[AddressInfo] ([id])
GO

ALTER TABLE [dbo].[PatientInsuranceInfo] CHECK CONSTRAINT [FK_PatientInsuranceInfo_AddressInfo_InsuranceCompanyAddressInfoId]
GO

ALTER TABLE [dbo].[PatientInsuranceInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientInsuranceInfo_ContactInfo_InsuranceCompanyContactInfoId] FOREIGN KEY([InsuranceCompanyContactInfoId])
	REFERENCES [dbo].[ContactInfo] ([id])
GO

ALTER TABLE [dbo].[PatientInsuranceInfo] CHECK CONSTRAINT [FK_PatientInsuranceInfo_ContactInfo_InsuranceCompanyContactInfoId]
GO

ALTER TABLE [dbo].[PatientInsuranceInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientInsuranceInfo_InsuranceType_InsuranceTypeId] FOREIGN KEY([InsuranceTypeId])
	REFERENCES [dbo].[InsuranceType] ([id])
GO

ALTER TABLE [dbo].[PatientInsuranceInfo] CHECK CONSTRAINT [FK_PatientInsuranceInfo_InsuranceType_InsuranceTypeId]
GO