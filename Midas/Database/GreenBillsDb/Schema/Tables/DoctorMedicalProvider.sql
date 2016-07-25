CREATE TABLE [dbo].[DoctorMedicalProvider](
	[ID] [INT] IDENTITY(1,1) NOT NULL,
	[ProviderID] [INT] NOT NULL,
	[DoctorID] [INT] NOT NULL,
	AssociationType tinyint,-- Employee,Doctor,Association between Provider and Doctor
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

EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'Association between Provider and Doctor',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'DoctorMedicalProvider',
    @level2type = N'COLUMN',
    @level2name = N'AssociationType'