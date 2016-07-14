CREATE TABLE [dbo].[MedicalFacilities](
	[ID] [INT] IDENTITY(1,1) NOT NULL,
	[Name] [NVARCHAR](100) NULL,
	[AccountID] [INT] NULL,
	[AddressId] [INT] NULL,
	[ContactInfoId] [INT] NULL,
	[Prefix] [NVARCHAR](2) NULL,
	[DefaultAttorneyUserID] [INT] NOT NULL,
	[IsDeleted] [BIT] NULL,
	[CreateByUserID] [INT] NOT NULL,
	[CreateDate] [DATETIME] NOT NULL,
	[UpdateByUserID] [INT] NULL,
	[UpdateDate] [DATETIME] NULL,
 CONSTRAINT [PK__MedicalO__3214EC27F0EE5B45] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[MedicalFacilities]  WITH CHECK ADD  CONSTRAINT [FK_MedicalFacilities_Account] FOREIGN KEY([AccountID])
REFERENCES [dbo].[Account] ([ID])
GO

ALTER TABLE [dbo].[MedicalFacilities] CHECK CONSTRAINT [FK_MedicalFacilities_Account]
GO

ALTER TABLE [dbo].[MedicalFacilities]  WITH CHECK ADD  CONSTRAINT [FK_MedicalFacilities_User] FOREIGN KEY([DefaultAttorneyUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[MedicalFacilities] CHECK CONSTRAINT [FK_MedicalFacilities_User]
GO

ALTER TABLE [dbo].[MedicalFacilities]  WITH CHECK ADD  CONSTRAINT [FK_MedicalOffices_Address] FOREIGN KEY([AddressId])
REFERENCES [dbo].[Address] ([ID])
GO

ALTER TABLE [dbo].[MedicalFacilities] CHECK CONSTRAINT [FK_MedicalOffices_Address]
GO

ALTER TABLE [dbo].[MedicalFacilities]  WITH CHECK ADD  CONSTRAINT [FK_MedicalOffices_ContactInfo] FOREIGN KEY([ContactInfoId])
REFERENCES [dbo].[ContactInfo] ([ID])
GO

ALTER TABLE [dbo].[MedicalFacilities] CHECK CONSTRAINT [FK_MedicalOffices_ContactInfo]
GO

ALTER TABLE [dbo].[MedicalFacilities]  WITH CHECK ADD  CONSTRAINT [FK_MedicalOffices_User] FOREIGN KEY([CreateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[MedicalFacilities] CHECK CONSTRAINT [FK_MedicalOffices_User]
GO

ALTER TABLE [dbo].[MedicalFacilities]  WITH CHECK ADD  CONSTRAINT [FK_MedicalOffices_User1] FOREIGN KEY([UpdateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[MedicalFacilities] CHECK CONSTRAINT [FK_MedicalOffices_User1]
GO


