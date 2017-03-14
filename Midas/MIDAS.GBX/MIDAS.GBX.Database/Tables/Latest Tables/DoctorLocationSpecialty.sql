CREATE TABLE [dbo].[DoctorLocationSpecialty]
(
	[Id] INT NOT NULL IDENTITY,
	[DoctorId] INT NOT NULL, 
    [LocationId] INT NOT NULL, 
    [SpecialtyId] INT NOT NULL, 
    [IsDeleted] BIT NULL DEFAULT 0, 
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
    CONSTRAINT [PK_DoctorLocationSpecialty] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[DoctorLocationSpecialty]  WITH CHECK ADD  CONSTRAINT [FK_DoctorLocationSpecialty_Doctor_DoctorId] FOREIGN KEY([DoctorId])
REFERENCES [dbo].[Doctor] ([Id])
GO

ALTER TABLE [dbo].[DoctorLocationSpecialty] CHECK CONSTRAINT [FK_DoctorLocationSpecialty_Doctor_DoctorId]
GO

ALTER TABLE [dbo].[DoctorLocationSpecialty]  WITH CHECK ADD  CONSTRAINT [FK_DoctorLocationSpecialty_Location_LocationId] FOREIGN KEY([LocationId])
REFERENCES [dbo].[Location] ([id])
GO

ALTER TABLE [dbo].[DoctorLocationSpecialty] CHECK CONSTRAINT [FK_DoctorLocationSpecialty_Location_LocationId]
GO

ALTER TABLE [dbo].[DoctorLocationSpecialty]  WITH CHECK ADD  CONSTRAINT [FK_DoctorLocationSpecialty_SpecialtyId] FOREIGN KEY([SpecialtyId])
REFERENCES [dbo].[Specialty] ([id])
GO

ALTER TABLE [dbo].[DoctorLocationSpecialty] CHECK CONSTRAINT [FK_DoctorLocationSpecialty_SpecialtyId]
GO
