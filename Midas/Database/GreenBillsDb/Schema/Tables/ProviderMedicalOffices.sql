CREATE TABLE [dbo].[ProviderMedicalFacilities](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ProviderID] [int] NOT NULL,
	[MedicalOfficeID] [int] NOT NULL,
	[BillingAdressID] [int] NOT NULL,
	[TreatingAddressID] [int] NOT NULL,
	[BillingContactInfoID] [int] NOT NULL,
	[TreatingContactInfoID] [int] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime] NULL,
 CONSTRAINT [PK__Provider__3214EC2769A4C5C5] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


ALTER TABLE [dbo].ProviderMedicalFacilities  WITH CHECK ADD  CONSTRAINT [FK_ProviderMedicalOffices_Address] FOREIGN KEY([BillingAdressID])
REFERENCES [dbo].[Address] ([ID])
GO

ALTER TABLE [dbo].ProviderMedicalFacilities CHECK CONSTRAINT [FK_ProviderMedicalOffices_Address]
GO

ALTER TABLE [dbo].ProviderMedicalFacilities  WITH CHECK ADD  CONSTRAINT [FK_ProviderMedicalOffices_Address1] FOREIGN KEY([TreatingAddressID])
REFERENCES [dbo].[Address] ([ID])
GO

ALTER TABLE [dbo].ProviderMedicalFacilities CHECK CONSTRAINT [FK_ProviderMedicalOffices_Address1]
GO

ALTER TABLE [dbo].ProviderMedicalFacilities  WITH CHECK ADD  CONSTRAINT [FK_ProviderMedicalOffices_ContactInfo] FOREIGN KEY([BillingContactInfoID])
REFERENCES [dbo].[ContactInfo] ([ID])
GO

ALTER TABLE [dbo].ProviderMedicalFacilities CHECK CONSTRAINT [FK_ProviderMedicalOffices_ContactInfo]
GO

ALTER TABLE [dbo].ProviderMedicalFacilities  WITH CHECK ADD  CONSTRAINT [FK_ProviderMedicalOffices_ContactInfo1] FOREIGN KEY([TreatingContactInfoID])
REFERENCES [dbo].[ContactInfo] ([ID])
GO

ALTER TABLE [dbo].[ProviderMedicalOffices] CHECK CONSTRAINT [FK_ProviderMedicalOffices_ContactInfo1]
GO

ALTER TABLE [dbo].ProviderMedicalFacilities  WITH CHECK ADD  CONSTRAINT [FK_ProviderMedicalOffices_MedicalOffices] FOREIGN KEY([MedicalOfficeID])
REFERENCES [dbo].[MedicalFacilities] ([ID])
GO

ALTER TABLE [dbo].ProviderMedicalFacilities CHECK CONSTRAINT [FK_ProviderMedicalOffices_MedicalOffices]
GO

ALTER TABLE [dbo].ProviderMedicalFacilities  WITH CHECK ADD  CONSTRAINT [FK_ProviderMedicalOffices_Provider] FOREIGN KEY([ProviderID])
REFERENCES [dbo].[Provider] ([ID])
GO

ALTER TABLE [dbo].ProviderMedicalFacilities CHECK CONSTRAINT [FK_ProviderMedicalOffices_Provider]
GO

ALTER TABLE [dbo].ProviderMedicalFacilities  WITH CHECK ADD  CONSTRAINT [FK_ProviderMedicalOffices_ProviderMedicalOffices] FOREIGN KEY([ID])
REFERENCES [dbo].ProviderMedicalFacilities ([ID])
GO

ALTER TABLE [dbo].[ProviderMedicalOffices] CHECK CONSTRAINT [FK_ProviderMedicalOffices_ProviderMedicalOffices]
GO

ALTER TABLE [dbo].ProviderMedicalFacilities  WITH CHECK ADD  CONSTRAINT [FK_ProviderMedicalOffices_User] FOREIGN KEY([CreateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].ProviderMedicalFacilities CHECK CONSTRAINT [FK_ProviderMedicalOffices_User]
GO

ALTER TABLE [dbo].ProviderMedicalFacilities  WITH CHECK ADD  CONSTRAINT [FK_ProviderMedicalOffices_User1] FOREIGN KEY([UpdateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].ProviderMedicalFacilities CHECK CONSTRAINT [FK_ProviderMedicalOffices_User1]
GO


