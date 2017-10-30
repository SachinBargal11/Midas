CREATE TABLE [dbo].[CaseCompanyConsentDocuments] (
    [Id]              INT           IDENTITY (1, 1) NOT NULL,
    [CaseId]          INT           NOT NULL,
    [CompanyId]       INT           NOT NULL,
    [MidasDocumentId] INT           NOT NULL,
    [DocumentName]    VARCHAR (500) NULL,
    [DocumentType]    VARCHAR (50)  NULL,
    [IsDeleted]       BIT           CONSTRAINT [DF_CaseCompanyConsentDocuments_IsDeleted] DEFAULT 0 NULL,
    [CreateUserId]    INT           NULL,
    [CreateDate]      DATETIME2 (7) NULL,
    [UpdateUserId]    INT           NULL,
    [UpdateDate]      DATETIME2 (7) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_CaseCompanyConsentDocuments_Case_CaseId] FOREIGN KEY ([CaseId]) REFERENCES [dbo].[Case] ([Id]),
    CONSTRAINT [FK_CaseCompanyConsentDocuments_Company_CaseId] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([id]),
    CONSTRAINT [FK_CaseCompanyConsentDocuments_MidasDocuments_MidasDocumentId] FOREIGN KEY ([MidasDocumentId]) REFERENCES [dbo].[MidasDocuments] ([Id])
);

