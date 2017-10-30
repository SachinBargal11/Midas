CREATE TABLE [dbo].[CaseDocuments] (
    [Id]              INT           IDENTITY (1, 1) NOT NULL,
    [CaseId]          INT           NOT NULL,
    [MidasDocumentId] INT           NOT NULL,
    [DocumentName]    VARCHAR (500) NULL,
    [DocumentType]    VARCHAR (50)  NULL,
    [IsDeleted]       BIT           CONSTRAINT [DF_CaseDocuments_IsDeleted] DEFAULT 0 NULL,
    [CreateUserId]    INT           NULL,
    [CreateDate]      DATETIME2 (7) NULL,
    [UpdateUserId]    INT           NULL,
    [UpdateDate]      DATETIME2 (7) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_CaseDocuments_Case_CaseId] FOREIGN KEY ([CaseId]) REFERENCES [dbo].[Case] ([Id]),
    CONSTRAINT [FK_CaseDocuments_MidasDocuments_MidasDocumentId] FOREIGN KEY ([MidasDocumentId]) REFERENCES [dbo].[MidasDocuments] ([Id])
);

