CREATE TABLE [dbo].[SocialMedia] (
    [Id]             TINYINT        IDENTITY (1, 1) NOT NULL,
    [Name]           NVARCHAR (128) NOT NULL,
    [IsDeleted]      BIT            DEFAULT ((0)) NULL,
    [CreateByUserID] INT            NOT NULL,
    [CreateDate]     DATETIME2 (7)  NOT NULL,
    [UpdateByUserID] INT            NULL,
    [UpdateDate]     DATETIME2 (7)  NULL,
    CONSTRAINT [PK_SocialMedia] PRIMARY KEY CLUSTERED ([Id] ASC)
);

