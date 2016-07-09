CREATE TABLE [dbo].[MedicalFacilities](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NULL,
	AccountID [int] NULL,
	[AddressId] [int] NULL,
	[ContactInfoId] [int] NULL,
	[Prefix] [nvarchar](2) NULL,
	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime] NULL,
 CONSTRAINT [PK__MedicalO__3214EC27F0EE5B45] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].MedicalFacilities  WITH CHECK ADD  CONSTRAINT [FK_MedicalOffices_Address] FOREIGN KEY([AddressId])
REFERENCES [dbo].[Address] ([ID])
GO
ALTER TABLE [dbo].[MedicalFacilities]  WITH CHECK ADD  CONSTRAINT [FK_MedicalFacilities_Account] FOREIGN KEY([AccountID])
REFERENCES [dbo].[Account] ([ID])
GO
ALTER TABLE [dbo].MedicalFacilities CHECK CONSTRAINT [FK_MedicalOffices_Address]
GO

ALTER TABLE [dbo].MedicalFacilities  WITH CHECK ADD  CONSTRAINT [FK_MedicalOffices_ContactInfo] FOREIGN KEY([ContactInfoId])
REFERENCES [dbo].[ContactInfo] ([ID])
GO

ALTER TABLE [dbo].[MedicalOffices] CHECK CONSTRAINT [FK_MedicalOffices_ContactInfo]
GO

ALTER TABLE [dbo].MedicalFacilities  WITH CHECK ADD  CONSTRAINT [FK_MedicalOffices_User] FOREIGN KEY([CreateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].MedicalFacilities CHECK CONSTRAINT [FK_MedicalOffices_User]
GO

ALTER TABLE [dbo].MedicalFacilities  WITH CHECK ADD  CONSTRAINT [FK_MedicalOffices_User1] FOREIGN KEY([UpdateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].MedicalFacilities CHECK CONSTRAINT [FK_MedicalOffices_User1]
GO


