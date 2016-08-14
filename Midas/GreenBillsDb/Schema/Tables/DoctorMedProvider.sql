CREATE TABLE [dbo].[DoctorMedProvider](
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

ALTER TABLE [dbo].[DoctorMedProvider] ADD  CONSTRAINT [DF_DoctorMedProvider_CreateDate]  DEFAULT (GETDATE()) FOR [CreateDate]
GO

ALTER TABLE [dbo].[DoctorMedProvider]  WITH CHECK ADD  CONSTRAINT [FK_DoctorMedProvider_MedicalFacilities] FOREIGN KEY([MedicalFacilitiesID])
REFERENCES [dbo].[MedicalFacilities] ([ID])
GO

ALTER TABLE [dbo].[DoctorMedProvider] CHECK CONSTRAINT [FK_DoctorMedProvider_MedicalFacilities]
GO

ALTER TABLE [dbo].[DoctorMedProvider]  WITH CHECK ADD  CONSTRAINT [FK_DoctorMedProvider_Provider] FOREIGN KEY([ProviderID])
REFERENCES [dbo].[Provider] ([ID])
GO

ALTER TABLE [dbo].[DoctorMedProvider] CHECK CONSTRAINT [FK_DoctorMedProvider_Provider]
GO

ALTER TABLE [dbo].[DoctorMedProvider]  WITH CHECK ADD  CONSTRAINT [FK_DoctorMedProvider_User] FOREIGN KEY([DoctorID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[DoctorMedProvider] CHECK CONSTRAINT [FK_DoctorMedProvider_User]
GO

ALTER TABLE [dbo].[DoctorMedProvider]  WITH CHECK ADD  CONSTRAINT [FK_DoctorMedProvider_User1] FOREIGN KEY([CreateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[DoctorMedProvider] CHECK CONSTRAINT [FK_DoctorMedProvider_User1]
GO

ALTER TABLE [dbo].[DoctorMedProvider]  WITH CHECK ADD  CONSTRAINT [FK_DoctorMedProvider_User2] FOREIGN KEY([UpdateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[DoctorMedProvider] CHECK CONSTRAINT [FK_DoctorMedProvider_User2]
GO
