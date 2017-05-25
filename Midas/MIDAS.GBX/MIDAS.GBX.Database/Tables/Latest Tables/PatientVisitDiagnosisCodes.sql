CREATE TABLE [dbo].[PatientVisitDiagnosisCodes]
(
	[Id] INT IDENTITY(1,1) NOT NULL,	
	[PatientVisitId] INT NOT NULL, 
    [DiagnosisCodeId] INT NOT NULL, 

	[IsDeleted] [bit] NULL DEFAULT 0,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL, 
    CONSTRAINT [PK_PatientVisitDiagnosisCodes] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[PatientVisitDiagnosisCodes]  WITH CHECK ADD  CONSTRAINT [FK_PatientVisitDiagnosisCodes_PatientVisit2_PatientVisitId] FOREIGN KEY([PatientVisitId])
	REFERENCES [dbo].[PatientVisit2] ([Id])
GO

ALTER TABLE [dbo].[PatientVisitDiagnosisCodes] CHECK CONSTRAINT [FK_PatientVisitDiagnosisCodes_PatientVisit2_PatientVisitId]
GO

ALTER TABLE [dbo].[PatientVisitDiagnosisCodes]  WITH CHECK ADD  CONSTRAINT [FK_PatientVisitDiagnosisCodes_DiagnosisCode_DiagnosisCodeId] FOREIGN KEY([DiagnosisCodeId])
	REFERENCES [dbo].[DiagnosisCode] ([Id])
GO

ALTER TABLE [dbo].[PatientVisitDiagnosisCodes] CHECK CONSTRAINT [FK_PatientVisitDiagnosisCodes_DiagnosisCode_DiagnosisCodeId]
GO
