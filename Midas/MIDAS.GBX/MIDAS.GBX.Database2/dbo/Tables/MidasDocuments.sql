CREATE TABLE [dbo].[MidasDocuments] (
    [Id]           INT            IDENTITY (1, 1) NOT NULL,
    [ObjectType]   VARCHAR (50)   NULL,
    [ObjectId]     INT            NOT NULL,
    [DocumentPath] VARCHAR (5000) NULL,
    [DocumentName] VARCHAR (500)  NULL,
    [CreateDate]   DATETIME2 (7)  NULL,
    [UpdateDate]   DATETIME2 (7)  NULL,
    [CreateUserId] INT            NULL,
    [UpdateUserId] INT            NULL,
    [IsDeleted]    BIT            NULL,
    [DocumentType] VARCHAR (50)   NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

