
CREATE TABLE [dbo].[DoctorMedicalFacilitiesProvider](
	[ID] [INT] IDENTITY(1,1) NOT NULL,
	[ProviderID] [INT] NOT NULL,
	[MedicalFacilitiesID] [INT] NOT NULL,
	[DoctorID] [INT] NOT NULL,
	[IsDeleted] [BIT] NULL,
	[CreateByUserID] [INT] NOT NULL,
	[CreateDate] [DATETIME] NOT NULL,
	[UpdateByUserID] [INT] NULL,
	[UpdateDate] [DATETIME] NULL,
 CONSTRAINT [PK_DoctorMedProvider] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[DoctorMedicalFacilitiesProvider] ADD  CONSTRAINT [DF_DoctorMedProvider_CreateDate]  DEFAULT (GETDATE()) FOR [CreateDate]
GO

ALTER TABLE [dbo].[DoctorMedicalFacilitiesProvider]  WITH CHECK ADD  CONSTRAINT [FK_DoctorMedicalFacilitiesProvider_Doctor] FOREIGN KEY([DoctorID])
REFERENCES [dbo].[Doctor] ([ID])
GO

ALTER TABLE [dbo].[DoctorMedicalFacilitiesProvider] CHECK CONSTRAINT [FK_DoctorMedicalFacilitiesProvider_Doctor]
GO

ALTER TABLE [dbo].[DoctorMedicalFacilitiesProvider]  WITH CHECK ADD  CONSTRAINT [FK_DoctorMedicalFacilitiesProvider_MedicalFacilities] FOREIGN KEY([MedicalFacilitiesID])
REFERENCES [dbo].[MedicalFacilities] ([ID])
GO

ALTER TABLE [dbo].[DoctorMedicalFacilitiesProvider] CHECK CONSTRAINT [FK_DoctorMedicalFacilitiesProvider_MedicalFacilities]
GO

ALTER TABLE [dbo].[DoctorMedicalFacilitiesProvider]  WITH CHECK ADD  CONSTRAINT [FK_DoctorMedicalFacilitiesProvider_Provider] FOREIGN KEY([ProviderID])
REFERENCES [dbo].[Provider] ([ID])
GO

ALTER TABLE [dbo].[DoctorMedicalFacilitiesProvider] CHECK CONSTRAINT [FK_DoctorMedicalFacilitiesProvider_Provider]
GO

ALTER TABLE [dbo].[DoctorMedicalFacilitiesProvider]  WITH CHECK ADD  CONSTRAINT [FK_DoctorMedicalFacilitiesProvider_User] FOREIGN KEY([CreateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[DoctorMedicalFacilitiesProvider] CHECK CONSTRAINT [FK_DoctorMedicalFacilitiesProvider_User]
GO

ALTER TABLE [dbo].[DoctorMedicalFacilitiesProvider]  WITH CHECK ADD  CONSTRAINT [FK_DoctorMedicalFacilitiesProvider_User1] FOREIGN KEY([UpdateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[DoctorMedicalFacilitiesProvider] CHECK CONSTRAINT [FK_DoctorMedicalFacilitiesProvider_User1]
GO
