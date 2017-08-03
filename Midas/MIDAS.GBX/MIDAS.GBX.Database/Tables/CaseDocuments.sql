CREATE TABLE [dbo].[CaseDocuments](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CaseId] [int] NOT NULL,
	[MidasDocumentId] [int] NOT NULL,
	[DocumentName] [varchar](500) NULL,
	[CreateDate] [datetime2](7) NULL,
	[UpdateDate] [datetime2](7) NULL,
	[CreateUserId] [int] NULL,
	[UpdateUserId] [int] NULL,
	[IsDeleted] [bit] NULL,
	[DocumentType] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/*ALTER TABLE [dbo].[CaseDocuments]  WITH CHECK ADD  CONSTRAINT [FK_CaseDocuments_MidasDocuments_MidasDocumentId] FOREIGN KEY([MidasDocumentId])
REFERENCES [dbo].[MidasDocuments] ([Id])
GO

ALTER TABLE [dbo].[CaseDocuments] CHECK CONSTRAINT [FK_CaseDocuments_MidasDocuments_MidasDocumentId]
GO
ALTER TABLE CaseDocuments ADD DocumentType varchar(50) NULL;
*/


ALTER TABLE [dbo].[CaseDocuments]  WITH CHECK ADD  CONSTRAINT [FK_CaseDocuments_Case_CaseId] FOREIGN KEY([CaseId])
    REFERENCES [dbo].[Case] ([Id])
GO

ALTER TABLE [dbo].[CaseDocuments] CHECK CONSTRAINT [FK_CaseDocuments_Case_CaseId]
GO
