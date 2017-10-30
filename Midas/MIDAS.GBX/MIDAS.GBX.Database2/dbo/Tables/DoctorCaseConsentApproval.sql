CREATE TABLE [dbo].[DoctorCaseConsentApproval] (
    [Id]              INT           IDENTITY (1, 1) NOT NULL,
    [DoctorId]        INT           NOT NULL,
    [CaseId]          INT           NULL,
    [ConsentReceived] NVARCHAR (50) NULL,
    [IsDeleted]       BIT           DEFAULT ((0)) NULL,
    [CreateByUserID]  INT           NOT NULL,
    [CreateDate]      DATETIME2 (7) NOT NULL,
    [UpdateByUserID]  INT           NULL,
    [UpdateDate]      DATETIME2 (7) NULL,
    [Patientid]       INT           NULL,
    [FileName]        VARCHAR (100) NULL,
    CONSTRAINT [PK_DoctorCaseConsentApproval] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_DoctorCaseConsentApproval_Case_CaseId] FOREIGN KEY ([CaseId]) REFERENCES [dbo].[Case] ([Id]),
    CONSTRAINT [FK_DoctorCaseConsentApproval_Doctor_DoctorId] FOREIGN KEY ([DoctorId]) REFERENCES [dbo].[Doctor] ([Id])
);

