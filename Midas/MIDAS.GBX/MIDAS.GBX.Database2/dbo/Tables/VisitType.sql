CREATE TABLE [dbo].[VisitType] (
    [Id]             TINYINT        IDENTITY (1, 1) NOT NULL,
    [Name]           NVARCHAR (50)  NULL,
    [Description]    NVARCHAR (128) NULL,
    [IsDeleted]      BIT            DEFAULT ((0)) NULL,
    [CreateByUserID] INT            NOT NULL,
    [CreateDate]     DATETIME2 (7)  NOT NULL,
    [UpdateByUserID] INT            NULL,
    [UpdateDate]     DATETIME2 (7)  NULL,
    CONSTRAINT [PK_VisitType] PRIMARY KEY CLUSTERED ([Id] ASC)
);

