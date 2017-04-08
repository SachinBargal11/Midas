CREATE TABLE [dbo].[ReferralDocuments](
	[Id] [int] NOT NULL,
	[ReferralId] [int] NOT NULL,
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

ALTER TABLE [dbo].[ReferralDocuments]  WITH CHECK ADD  CONSTRAINT [FK_ReferralDocuments_MidasDocuments_MidasDocumentId] FOREIGN KEY([MidasDocumentId])
	REFERENCES [dbo].[MidasDocuments] ([Id])
GO

ALTER TABLE [dbo].[ReferralDocuments] CHECK CONSTRAINT [FK_ReferralDocuments_MidasDocuments_MidasDocumentId]
GO

ALTER TABLE [dbo].[ReferralDocuments]  WITH CHECK ADD  CONSTRAINT [FK_ReferralDocuments_Referral_ReferralId] FOREIGN KEY([ReferralId])
	REFERENCES [dbo].[Referral] ([Id])
GO

ALTER TABLE [dbo].[ReferralDocuments] CHECK CONSTRAINT [FK_ReferralDocuments_Referral_ReferralId]
GO


