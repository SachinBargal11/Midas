CREATE TABLE [dbo].[State] (
    [Id]        TINYINT       NOT NULL,
    [StateCode] NVARCHAR (2)  NOT NULL,
    [StateText] NVARCHAR (50) NOT NULL,
    [IsDeleted] BIT           NULL,
    CONSTRAINT [PK_States] PRIMARY KEY CLUSTERED ([Id] ASC),
    UNIQUE NONCLUSTERED ([StateCode] ASC)
);

