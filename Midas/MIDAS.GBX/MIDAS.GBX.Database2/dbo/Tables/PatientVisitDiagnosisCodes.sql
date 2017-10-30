CREATE TABLE [dbo].[PatientVisitDiagnosisCodes] (
    [Id]              INT           IDENTITY (1, 1) NOT NULL,
    [PatientVisitId]  INT           NOT NULL,
    [DiagnosisCodeId] INT           NOT NULL,
    [IsDeleted]       BIT           DEFAULT ((0)) NULL,
    [CreateByUserID]  INT           NOT NULL,
    [CreateDate]      DATETIME2 (7) NOT NULL,
    [UpdateByUserID]  INT           NULL,
    [UpdateDate]      DATETIME2 (7) NULL,
    CONSTRAINT [PK_PatientVisitDiagnosisCodes] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_PatientVisitDiagnosisCodes_DiagnosisCode_DiagnosisCodeId] FOREIGN KEY ([DiagnosisCodeId]) REFERENCES [dbo].[DiagnosisCode] ([Id]),
    CONSTRAINT [FK_PatientVisitDiagnosisCodes_PatientVisit_PatientVisitId] FOREIGN KEY ([PatientVisitId]) REFERENCES [dbo].[PatientVisit] ([Id])
);

