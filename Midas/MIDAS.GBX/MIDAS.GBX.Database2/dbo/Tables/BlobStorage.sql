CREATE TABLE [dbo].[BlobStorage] (
    [Id]                INT            NOT NULL,
    [BlobStorageTypeId] INT            NOT NULL,
    [BlobStoargeURL]    VARCHAR (5000) NULL,
    [BlobStorageKey]    VARCHAR (500)  NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_BlobStorageType_BlobStorage_BlobStorageTypeId] FOREIGN KEY ([BlobStorageTypeId]) REFERENCES [dbo].[BlobStorageType] ([Id])
);

