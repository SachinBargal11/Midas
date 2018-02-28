CREATE TABLE [dbo].[CompanyCaseConsentApproval] (
    [Id]                 INT           IDENTITY (1, 1) NOT NULL,
    [CompanyId]          INT           NOT NULL,
    [CaseId]             INT           NOT NULL,
    [IsDeleted]          BIT           DEFAULT ((0)) NULL,
    [CreateByUserID]     INT           NOT NULL,
    [CreateDate]         DATETIME2 (7) NOT NULL,
    [UpdateByUserID]     INT           NULL,
    [UpdateDate]         DATETIME2 (7) NULL,
    [ConsentGivenTypeId] TINYINT       NOT NULL,
    CONSTRAINT [PK_CompanyCaseConsentApproval] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_CompanyCaseConsentApproval_Case_CaseId] FOREIGN KEY ([CaseId]) REFERENCES [dbo].[Case] ([Id]),
    CONSTRAINT [FK_CompanyCaseConsentApproval_Company_CompanyId] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([id]),
    CONSTRAINT [FK_CompanyCaseConsentApproval_ConsentGivenType_ConsentGivenTypeId] FOREIGN KEY ([ConsentGivenTypeId]) REFERENCES [dbo].[ConsentGivenType] ([Id])
);

