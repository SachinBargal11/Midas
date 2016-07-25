
CREATE TABLE [dbo].[DoctorSpecialities](
	[ID] [INT] IDENTITY(1,1) NOT NULL,
	[DoctorID] [INT] NOT NULL,
	[SpecialityID] [INT] NOT NULL,
	[IsDeleted] [BIT] NOT NULL,
	[CreateByUserID] [INT] NOT NULL,
	[CreateDate] [DATETIME] NOT NULL,
	[UpdateByUserID] [INT] NULL,
	[UpdateDate] [DATETIME] NULL,
 CONSTRAINT [PK_DoctorSpecialities] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[DoctorSpecialities]  WITH CHECK ADD  CONSTRAINT [FK_DoctorSpecialities_User] FOREIGN KEY([DoctorID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[DoctorSpecialities] CHECK CONSTRAINT [FK_DoctorSpecialities_User]
GO

ALTER TABLE [dbo].[DoctorSpecialities]  WITH CHECK ADD  CONSTRAINT [FK_DoctorSpecialities_User1] FOREIGN KEY([CreateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[DoctorSpecialities] CHECK CONSTRAINT [FK_DoctorSpecialities_User1]
GO

ALTER TABLE [dbo].[DoctorSpecialities]  WITH CHECK ADD  CONSTRAINT [FK_DoctorSpecialities_User2] FOREIGN KEY([UpdateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[DoctorSpecialities] CHECK CONSTRAINT [FK_DoctorSpecialities_User2]
GO

