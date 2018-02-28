CREATE TABLE [dbo].[Case] (
    [Id]                  INT           IDENTITY (1, 1) NOT NULL,
    [PatientId]           INT           NOT NULL,
    [CaseName]            NVARCHAR (50) NULL,
    [CaseTypeId]          TINYINT       NULL,
    [CarrierCaseNo]       NVARCHAR (50) NULL,
    [CaseStatusId]        TINYINT       NULL,
    [CaseSource]          VARCHAR (50)  NULL,
    [ClaimFileNumber]     INT           NULL,
    [Medicare]            BIT           CONSTRAINT [DF_Case_Medicare] DEFAULT 0 NULL,
    [Medicaid]            BIT           CONSTRAINT [DF_Case_Medicaid] DEFAULT 0 NULL,
    [SSDisabililtyIncome] BIT           CONSTRAINT [DF_Case_SSDisabililtyIncome] DEFAULT 0 NULL,
    [IsDeleted]           BIT           CONSTRAINT [DF_Case_IsDeleted] DEFAULT 0 NULL,
    [CreateByUserID]      INT           NOT NULL,
    [CreateDate]          DATETIME2 (7) NOT NULL,
    [UpdateByUserID]      INT           NULL,
    [UpdateDate]          DATETIME2 (7) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Case_CaseStatus_CaseStatusId] FOREIGN KEY ([CaseStatusId]) REFERENCES [dbo].[CaseStatus] ([Id]),
    CONSTRAINT [FK_Case_CaseType_CaseTypeId] FOREIGN KEY ([CaseTypeId]) REFERENCES [dbo].[CaseType] ([Id]),
    CONSTRAINT [FK_Case_Patient_PatientId] FOREIGN KEY ([PatientId]) REFERENCES [dbo].[Patient] ([Id])
);

