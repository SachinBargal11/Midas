CREATE TABLE [dbo].[Gender] (
    [Id]         TINYINT       NOT NULL,
    [GenderText] NVARCHAR (50) NOT NULL,
    [IsDeleted]  BIT           NULL,
    CONSTRAINT [PK_Gender] PRIMARY KEY CLUSTERED ([Id] ASC)
);

