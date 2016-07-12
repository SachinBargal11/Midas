CREATE TABLE [dbo].[SpecialtyDetails](
	[ID] [INT] IDENTITY(1,1) NOT NULL,
	[SpecialtyId] [INT] NULL,
	[IsUnitApply] [BIT] NULL,
	[FollowUpDays] [INT] NULL,
	[FollowupTime] [INT] NULL,
	[InitialDays] [INT] NULL,
	[InitialTime] [INT] NULL,
	[IsInitialEvaluation] [BIT] NULL,
	[Include1500] [BIT] NULL,
	[AssociatedSpecialty] [INT] NULL,
	[AllowMultipleVisit] [BIT] NULL,
	[MedicalOfficeId] [INT] NULL,
	[IsDeleted] [BIT] NULL,
	[CreateByUserID] [INT] NOT NULL,
	[CreateDate] [DATETIME] NULL,
	[UpdateByUserID] [INT] NULL,
	[UpdateDate] [DATETIME] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[SpecialtyDetails]  WITH CHECK ADD  CONSTRAINT [FK_SpecialtyDetails_Specialty] FOREIGN KEY([CreateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[SpecialtyDetails] CHECK CONSTRAINT [FK_SpecialtyDetails_Specialty]
GO

ALTER TABLE [dbo].[SpecialtyDetails]  WITH CHECK ADD  CONSTRAINT [FK_SpecialtyDetails_User] FOREIGN KEY([CreateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[SpecialtyDetails] CHECK CONSTRAINT [FK_SpecialtyDetails_User]
GO

ALTER TABLE [dbo].[SpecialtyDetails]  WITH CHECK ADD  CONSTRAINT [FK_SpecialtyDetails_User1] FOREIGN KEY([UpdateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[SpecialtyDetails] CHECK CONSTRAINT [FK_SpecialtyDetails_User1]
GO

