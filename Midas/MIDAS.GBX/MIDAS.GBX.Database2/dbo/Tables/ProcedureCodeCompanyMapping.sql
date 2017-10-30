CREATE TABLE [dbo].[ProcedureCodeCompanyMapping] (
    [ID]                INT           IDENTITY (1, 1) NOT NULL,
    [ProcedureCodeID]   INT           NOT NULL,
    [CompanyID]         INT           NOT NULL,
    [Amount]            MONEY         NULL,
    [EffectiveFromDate] DATE          DEFAULT (getdate()) NULL,
    [EffectiveToDate]   DATE          NULL,
    [IsDeleted]         BIT           DEFAULT ((0)) NULL,
    [CreateByUserID]    INT           NOT NULL,
    [CreateDate]        DATETIME2 (7) NOT NULL,
    [UpdateByUserID]    INT           NULL,
    [UpdateDate]        DATETIME2 (7) NULL,
    PRIMARY KEY CLUSTERED ([ID] ASC),
    CONSTRAINT [FK_ProcedureCodeCompanyMapping_Company_CompanyID] FOREIGN KEY ([CompanyID]) REFERENCES [dbo].[Company] ([id]),
    CONSTRAINT [FK_ProcedureCodeCompanyMapping_ProcedureCode_ProcedureCodeID] FOREIGN KEY ([ProcedureCodeID]) REFERENCES [dbo].[ProcedureCode] ([Id])
);

