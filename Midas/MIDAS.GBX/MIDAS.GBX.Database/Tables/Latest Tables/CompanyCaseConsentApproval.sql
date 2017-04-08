CREATE TABLE [dbo].[CompanyCaseConsentApproval]
(
	[Id] INT NOT NULL IDENTITY(1, 1),
	[CompanyId] INT NOT NULL,
	[CaseId] INT NOT NULL, 

	[IsDeleted] [bit] NULL DEFAULT 0,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
    CONSTRAINT [PK_CompanyCaseConsentApproval] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[CompanyCaseConsentApproval]  WITH CHECK ADD  CONSTRAINT [FK_CompanyCaseConsentApproval_Company_CompanyId] FOREIGN KEY([CompanyId])
REFERENCES [dbo].[Company] ([Id])
GO

ALTER TABLE [dbo].[CompanyCaseConsentApproval] CHECK CONSTRAINT [FK_CompanyCaseConsentApproval_Company_CompanyId]
GO

ALTER TABLE [dbo].[CompanyCaseConsentApproval]  WITH CHECK ADD CONSTRAINT [FK_CompanyCaseConsentApproval_Case_CaseId] FOREIGN KEY([CaseId])
	REFERENCES [dbo].[Case] ([Id])
GO

ALTER TABLE [dbo].[CompanyCaseConsentApproval] CHECK CONSTRAINT [FK_CompanyCaseConsentApproval_Case_CaseId]
GO
