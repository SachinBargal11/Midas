CREATE TABLE [dbo].[CaseCompanyMapping] (
    [Id]               INT           IDENTITY (1, 1) NOT NULL,
    [CaseId]           INT           NOT NULL,
    [CompanyId]        INT           NOT NULL,
    [IsOriginator]     BIT           CONSTRAINT [DF_CaseCompanyMapping_IsOriginator] DEFAULT 0 NOT NULL,
    [AddedByCompanyId] INT           NOT NULL,
    [IsDeleted]        BIT           CONSTRAINT [DF_CaseCompanyMapping_IsDeleted] DEFAULT 0 NULL,
    [CreateByUserID]   INT           NOT NULL,
    [CreateDate]       DATETIME2 (7) NOT NULL,
    [UpdateByUserID]   INT           NULL,
    [UpdateDate]       DATETIME2 (7) NULL,    
    CONSTRAINT [PK_CaseCompanyLocationMapping] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_CaseCompanyMapping_Case_CaseId] FOREIGN KEY ([CaseId]) REFERENCES [dbo].[Case] ([Id]),
    CONSTRAINT [FK_CaseCompanyMapping_Company_AddedByCompanyId] FOREIGN KEY ([AddedByCompanyId]) REFERENCES [dbo].[Company] ([id]),
    CONSTRAINT [FK_CaseCompanyMapping_Company_CompanyId] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([id])
);

