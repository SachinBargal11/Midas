CREATE TABLE [dbo].[DoctorSpecialities](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[DoctorID] [int] NOT NULL,
	[SpecialityID] [int] NOT NULL,
	[IsDeleted] [bit] NOT NULL CONSTRAINT [DF_DoctorSpecialities_IsDeleted]  DEFAULT ((0)),
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
 CONSTRAINT [PK_DoctorSpecialities] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

--ALTER TABLE [dbo].[DoctorSpecialities]  WITH CHECK ADD  CONSTRAINT [FK_DoctorSpecialities_Doctor] FOREIGN KEY([DoctorID])
--	REFERENCES [dbo].[User] ([id])
--GO

--ALTER TABLE [dbo].[DoctorSpecialities] CHECK CONSTRAINT [FK_DoctorSpecialities_Doctor]
--GO

ALTER TABLE [dbo].[DoctorSpecialities]  WITH CHECK ADD  CONSTRAINT [FK_DoctorSpecialities_Specialty] FOREIGN KEY([SpecialityID])
	REFERENCES [dbo].[Specialty] ([id])
GO

ALTER TABLE [dbo].[DoctorSpecialities] CHECK CONSTRAINT [FK_DoctorSpecialities_Specialty]
GO

--ALTER TABLE [dbo].[DoctorSpecialities] DROP CONSTRAINT [FK_DoctorSpecialities_Doctor]
--GO

ALTER TABLE [dbo].[DoctorSpecialities]  WITH CHECK ADD  CONSTRAINT [FK_DoctorSpecialities_Doctor_DoctorID] FOREIGN KEY([DoctorID])
	REFERENCES [dbo].[Doctor] ([Id])
GO

ALTER TABLE [dbo].[DoctorSpecialities] CHECK CONSTRAINT [FK_DoctorSpecialities_Doctor_DoctorID]
GO