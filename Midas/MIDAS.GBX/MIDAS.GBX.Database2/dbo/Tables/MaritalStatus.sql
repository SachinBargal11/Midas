CREATE TABLE [dbo].[MaritalStatus] (
    [Id]         TINYINT       NOT NULL,
    [StatusText] NVARCHAR (50) NOT NULL,
    [IsDeleted]  BIT           NULL,
    CONSTRAINT [PK_MaritalStatus] PRIMARY KEY CLUSTERED ([Id] ASC)
);

