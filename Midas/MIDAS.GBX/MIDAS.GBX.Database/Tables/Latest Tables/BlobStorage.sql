CREATE TABLE [dbo].[BlobStorage](
	[Id] [int] NOT NULL,
	[BlobStorageTypeId] [int] NOT NULL,
	[BlobStoargeURL] [varchar](5000) NULL,
	[BlobStorageKey] [varchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[BlobStorage]  WITH CHECK ADD  CONSTRAINT [FK_BlobStorageType_BlobStorage_BlobStorageTypeId] FOREIGN KEY([BlobStorageTypeId])
	REFERENCES [dbo].[BlobStorageType] ([Id])
GO

ALTER TABLE [dbo].[BlobStorage] CHECK CONSTRAINT [FK_BlobStorageType_BlobStorage_BlobStorageTypeId]
GO


