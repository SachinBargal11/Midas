CREATE TABLE [dbo].[SpecialtyDetails](
	[ID] [INT] IDENTITY(1,1) NOT NULL,
	[SpecialtyId] [INT] NULL,
	ReevalDays [INT] NULL,
	ReevalVisitCount [INT] NULL,
	[InitialDays] [INT] NULL,
	[InitialVisitCount] [INT] NULL, -- Between Reeval and Intitial visit
	MaxReval int NULL,
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


EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'FK',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'SpecialtyDetails',
    @level2type = N'COLUMN',
    @level2name = N'SpecialtyId'