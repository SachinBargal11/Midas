CREATE TABLE [dbo].[PatientVisitProcedureCodes]
(
	[Id] INT IDENTITY(1,1) NOT NULL,	
	[PatientVisitId] INT NOT NULL, 
    [ProcedureCodeId] INT NOT NULL, 

	[IsDeleted] [bit] NULL DEFAULT 0,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL, 
    CONSTRAINT [PK_PatientVisitProcedureCodes] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[PatientVisitProcedureCodes]  WITH CHECK ADD  CONSTRAINT [FK_PatientVisitProcedureCodes_PatientVisit2_PatientVisitId] FOREIGN KEY([PatientVisitId])
	REFERENCES [dbo].[PatientVisit2] ([Id])
GO

ALTER TABLE [dbo].[PatientVisitProcedureCodes] CHECK CONSTRAINT [FK_PatientVisitProcedureCodes_PatientVisit2_PatientVisitId]
GO

ALTER TABLE [dbo].[PatientVisitProcedureCodes]  WITH CHECK ADD  CONSTRAINT [FK_PatientVisitDiagnosisCodes_ProcedureCode_ProcedureCodeId] FOREIGN KEY([ProcedureCodeId])
	REFERENCES [dbo].[ProcedureCode] ([Id])
GO

ALTER TABLE [dbo].[PatientVisitProcedureCodes] CHECK CONSTRAINT [FK_PatientVisitDiagnosisCodes_ProcedureCode_ProcedureCodeId]
GO
