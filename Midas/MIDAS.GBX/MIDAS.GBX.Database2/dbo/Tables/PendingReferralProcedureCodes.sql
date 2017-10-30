CREATE TABLE [dbo].[PendingReferralProcedureCodes] (
    [Id]                INT           IDENTITY (1, 1) NOT NULL,
    [PendingReferralId] INT           NOT NULL,
    [ProcedureCodeId]   INT           NOT NULL,
    [IsDeleted]         BIT           DEFAULT ((0)) NULL,
    [CreateByUserID]    INT           NOT NULL,
    [CreateDate]        DATETIME2 (7) NOT NULL,
    [UpdateByUserID]    INT           NULL,
    [UpdateDate]        DATETIME2 (7) NULL,
    CONSTRAINT [PK_PendingReferralProcedureCodes] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_PendingReferralProcedureCodes_PendingReferral_PendingReferralId] FOREIGN KEY ([PendingReferralId]) REFERENCES [dbo].[PendingReferral] ([Id]),
    CONSTRAINT [FK_PendingReferralProcedureCodes_ProcedureCode_ProcedureCodeId] FOREIGN KEY ([ProcedureCodeId]) REFERENCES [dbo].[ProcedureCode] ([Id])
);

