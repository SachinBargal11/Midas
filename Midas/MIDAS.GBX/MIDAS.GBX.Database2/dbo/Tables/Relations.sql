CREATE TABLE [dbo].[Relations] (
    [Id]           TINYINT       NOT NULL,
    [RelationText] NVARCHAR (50) NOT NULL,
    [IsDeleted]    BIT           NULL,
    CONSTRAINT [PK_Relations] PRIMARY KEY CLUSTERED ([Id] ASC)
);

