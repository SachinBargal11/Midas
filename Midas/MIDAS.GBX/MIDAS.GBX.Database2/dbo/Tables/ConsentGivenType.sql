CREATE TABLE [dbo].[ConsentGivenType] (
    [Id]              TINYINT        NOT NULL,
    [TypeText]        NVARCHAR (50)  NOT NULL,
    [TypeDescription] NVARCHAR (200) NULL,
    CONSTRAINT [PK_ConsentGivenType] PRIMARY KEY CLUSTERED ([Id] ASC)
);

