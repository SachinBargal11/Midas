CREATE TABLE [dbo].[DiagnosisCodeCompany] (
    [Id]              INT      IDENTITY (1, 1) NOT NULL,
    [DiagnosisCodeID] INT      NULL,
    [CompanyID]       INT      NULL,
    [IsDeleted]       BIT      DEFAULT ((0)) NULL,
    [CreatedByUserID] INT      NOT NULL,
    [CreateDate]      DATETIME DEFAULT (getdate()) NULL,
    [UpdatedByUserID] INT      NULL,
    [UpdateDate]      DATETIME NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([CompanyID]) REFERENCES [dbo].[Company] ([id]),
    FOREIGN KEY ([DiagnosisCodeID]) REFERENCES [dbo].[DiagnosisCode] ([Id])
);

