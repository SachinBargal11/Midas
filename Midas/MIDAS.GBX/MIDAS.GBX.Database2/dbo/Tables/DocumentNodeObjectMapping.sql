CREATE TABLE [dbo].[DocumentNodeObjectMapping] (
    [id]             INT           IDENTITY (1, 1) NOT NULL,
    [ObjectType]     TINYINT       NULL,
    [ChildNode]      NVARCHAR (50) NOT NULL,
    [CompanyId]      INT           NULL,
    [IsDeleted]      BIT           NULL,
    [CreateByUserID] INT           NOT NULL,
    [CreateDate]     DATETIME2 (7) NOT NULL,
    [UpdateByUserID] INT           NULL,
    [UpdateDate]     DATETIME2 (7) NULL,
    [ISCUSTOMTYPE]   BIT           NULL,
    PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_DocumentNodeObjectMapping_Company] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([id])
);

