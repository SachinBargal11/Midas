CREATE TABLE [dbo].[DiagnosisTypeCompany] (
    [Id]              INT      IDENTITY (1, 1) NOT NULL,
    [DiagnosisTypeID] INT      NULL,
    [CompanyID]       INT      NULL,
    [IsDeleted]       BIT      DEFAULT ((0)) NULL,
    [CreatedByUserID] INT      NOT NULL,
    [CreateDate]      DATETIME DEFAULT (getdate()) NULL,
    [UpdatedByUserID] INT      NULL,
    [UpdateDate]      DATETIME NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([CompanyID]) REFERENCES [dbo].[Company] ([id]),
    FOREIGN KEY ([DiagnosisTypeID]) REFERENCES [dbo].[DiagnosisType] ([Id])
);

