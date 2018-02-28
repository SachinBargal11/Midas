CREATE TABLE [dbo].[CaseStatus] (
    [Id]             TINYINT       NOT NULL,
    [CaseStatusText] NVARCHAR (50) NOT NULL,
    [IsDeleted]      BIT           CONSTRAINT [DF_CaseStatus_IsDeleted] DEFAULT 0 NULL,
    CONSTRAINT [PK_CaseStatus] PRIMARY KEY CLUSTERED ([Id] ASC)
);

