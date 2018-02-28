CREATE TABLE [dbo].[CaseType] (
    [Id]               TINYINT       NOT NULL,
    [CaseTypeText]     NVARCHAR (50) NOT NULL,
    [IsDeleted]        BIT           NULL,
    [AbbreviationCode] VARCHAR (10)  DEFAULT ('') NOT NULL,
    [IsInclude1500]    BIT           DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_CaseType] PRIMARY KEY CLUSTERED ([Id] ASC)
);

