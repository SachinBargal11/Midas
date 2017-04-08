CREATE TABLE [dbo].[CaseCompanyConsentDocuments](
	[Id] [int] NOT NULL,
	[CaseId] [int] NOT NULL,
	[CompanyId] [int] NOT NULL,
	[MidasDocumentId] [int] NOT NULL,
	[DocumentName] [varchar](500) NULL,
	[CreateDate] [datetime2](7) NULL,
	[UpdateDate] [datetime2](7) NULL,
	[CreateUserId] [int] NULL,
	[UpdateUserId] [int] NULL,
	[IsDeleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id]
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[CaseCompanyConsentDocuments] WITH CHECK ADD CONSTRAINT [FK_CaseCompanyConsentDocuments_MidasDocuments_MidasDocumentId] FOREIGN KEY([MidasDocumentId])
	REFERENCES [dbo].[MidasDocuments] ([Id]) 
GO

ALTER TABLE [dbo].[CaseCompanyConsentDocuments] WITH CHECK ADD CONSTRAINT [FK_CaseCompanyConsentDocuments_Case_CaseId] FOREIGN KEY([CaseId])
	REFERENCES [dbo].[Case] ([Id])
GO

ALTER TABLE [dbo].[CaseCompanyConsentDocuments] WITH CHECK ADD CONSTRAINT [FK_CaseCompanyConsentDocuments_Company_CaseId] FOREIGN KEY([CompanyId])
	REFERENCES [dbo].[Company] ([Id])
GO
