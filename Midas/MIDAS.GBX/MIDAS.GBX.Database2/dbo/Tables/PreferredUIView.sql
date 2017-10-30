CREATE TABLE [dbo].[PreferredUIView] (
    [Id]                  TINYINT       IDENTITY (1, 1) NOT NULL,
    [PreferredUIViewText] NVARCHAR (64) NOT NULL,
    [IsDeleted]           BIT           CONSTRAINT [DF_PreferredUIView_IsDeleted] DEFAULT ((0)) NULL,
    [CreateByUserID]      INT           NOT NULL,
    [CreateDate]          DATETIME2 (7) NOT NULL,
    [UpdateByUserID]      INT           NULL,
    [UpdateDate]          DATETIME2 (7) NULL,
    CONSTRAINT [PK_PreferredUIView] PRIMARY KEY CLUSTERED ([Id] ASC)
);

