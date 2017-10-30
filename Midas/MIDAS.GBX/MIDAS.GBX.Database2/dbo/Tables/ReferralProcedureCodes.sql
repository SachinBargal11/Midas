CREATE TABLE [dbo].[ReferralProcedureCodes] (
    [Id]              INT           IDENTITY (1, 1) NOT NULL,
    [ReferralId]      INT           NOT NULL,
    [ProcedureCodeId] INT           NOT NULL,
    [IsDeleted]       BIT           DEFAULT ((0)) NULL,
    [CreateByUserID]  INT           NOT NULL,
    [CreateDate]      DATETIME2 (7) NOT NULL,
    [UpdateByUserID]  INT           NULL,
    [UpdateDate]      DATETIME2 (7) NULL,
    CONSTRAINT [PK_ReferralProcedureCodes] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_ReferralProcedureCodes_ProcedureCode_ProcedureCodeId] FOREIGN KEY ([ProcedureCodeId]) REFERENCES [dbo].[ProcedureCode] ([Id]),
    CONSTRAINT [FK_ReferralProcedureCodes_Referral_ReferralId] FOREIGN KEY ([ReferralId]) REFERENCES [dbo].[Referral] ([Id])
);

