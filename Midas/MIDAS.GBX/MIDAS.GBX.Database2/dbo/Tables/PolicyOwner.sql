CREATE TABLE [dbo].[PolicyOwner] (
    [Id]          TINYINT       NOT NULL,
    [DisplayText] NVARCHAR (50) NOT NULL,
    [IsDeleted]   BIT           NULL,
    CONSTRAINT [PK_PolicyOwner] PRIMARY KEY CLUSTERED ([Id] ASC)
);

