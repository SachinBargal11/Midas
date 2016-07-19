CREATE TABLE [dbo].[CaseDiagnosisSpeciality](
	[ID] [INT] IDENTITY(1,1) NOT NULL,
	[CaseID] [INT] NOT NULL,
	[SpecialityID] [INT] NOT NULL,
	[IsDeleted] [BIT] NOT NULL,
	[CreateByUserID] [INT] NOT NULL,
	[CreateDate] [DATETIME] NOT NULL,
	[UpdateByUserID] [INT] NULL,
	[UpdateDate] [DATETIME] NULL,
 CONSTRAINT [PK_CaseDiagnosisSpeciality] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[CaseDiagnosisSpeciality]  WITH CHECK ADD  CONSTRAINT [FK_CaseDiagnosisSpeciality_Case] FOREIGN KEY([CaseID])
REFERENCES [dbo].[Case] ([ID])
GO

ALTER TABLE [dbo].[CaseDiagnosisSpeciality] CHECK CONSTRAINT [FK_CaseDiagnosisSpeciality_Case]
GO

ALTER TABLE [dbo].[CaseDiagnosisSpeciality]  WITH CHECK ADD  CONSTRAINT [FK_CaseDiagnosisSpeciality_Specialty] FOREIGN KEY([SpecialityID])
REFERENCES [dbo].[Specialty] ([ID])
GO

ALTER TABLE [dbo].[CaseDiagnosisSpeciality] CHECK CONSTRAINT [FK_CaseDiagnosisSpeciality_Specialty]
GO

ALTER TABLE [dbo].[CaseDiagnosisSpeciality]  WITH CHECK ADD  CONSTRAINT [FK_CaseDiagnosisSpeciality_User] FOREIGN KEY([CreateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[CaseDiagnosisSpeciality] CHECK CONSTRAINT [FK_CaseDiagnosisSpeciality_User]
GO

ALTER TABLE [dbo].[CaseDiagnosisSpeciality]  WITH CHECK ADD  CONSTRAINT [FK_CaseDiagnosisSpeciality_User1] FOREIGN KEY([UpdateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[CaseDiagnosisSpeciality] CHECK CONSTRAINT [FK_CaseDiagnosisSpeciality_User1]
GO