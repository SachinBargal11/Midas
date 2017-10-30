CREATE TABLE [dbo].[PatientVisitProcedureCodes] (
    [Id]              INT           IDENTITY (1, 1) NOT NULL,
    [PatientVisitId]  INT           NOT NULL,
    [ProcedureCodeId] INT           NOT NULL,
    [IsDeleted]       BIT           DEFAULT ((0)) NULL,
    [CreateByUserID]  INT           NOT NULL,
    [CreateDate]      DATETIME2 (7) NOT NULL,
    [UpdateByUserID]  INT           NULL,
    [UpdateDate]      DATETIME2 (7) NULL,
    CONSTRAINT [PK_PatientVisitProcedureCodes] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_PatientVisitDiagnosisCodes_ProcedureCode_ProcedureCodeId] FOREIGN KEY ([ProcedureCodeId]) REFERENCES [dbo].[ProcedureCode] ([Id]),
    CONSTRAINT [FK_PatientVisitProcedureCodes_PatientVisit_PatientVisitId] FOREIGN KEY ([PatientVisitId]) REFERENCES [dbo].[PatientVisit] ([Id])
);

