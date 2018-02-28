CREATE TABLE [dbo].[ICDTypeCode] (
    [Id]              INT          IDENTITY (1, 1) NOT NULL,
    [Code]            VARCHAR (50) NULL,
    [IsDeleted]       BIT          DEFAULT ((0)) NULL,
    [CreatedByUserID] INT          NOT NULL,
    [CreateDate]      DATETIME     DEFAULT (getdate()) NULL,
    [UpdatedByUserID] INT          NULL,
    [UpdateDate]      DATETIME     NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

