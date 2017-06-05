
CREATE TABLE [dbo].[VisitDocuments](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PatientVisitId] [int] NOT NULL,
	[MidasDocumentId] [int] NOT NULL,
	[DocumentName] [varchar](500) NULL,
	[CreateDate] [datetime2](7) NULL,
	[UpdateDate] [datetime2](7) NULL,
	[CreateUserId] [int] NULL,
	[UpdateUserId] [int] NULL,
	[IsDeleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


/*
ALTER TABLE [dbo].[VisitDocuments]  WITH CHECK ADD  CONSTRAINT [FK_VisitDocuments_MidasDocuments_MidasDocumentId] FOREIGN KEY([MidasDocumentId])
REFERENCES [dbo].[MidasDocuments] ([Id])
GO

ALTER TABLE [dbo].[VisitDocuments] CHECK CONSTRAINT [FK_VisitDocuments_MidasDocuments_MidasDocumentId]
GO

ALTER TABLE VisitDocuments ADD DocumentType varchar(50) NULL
GO
*/
