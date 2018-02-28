CREATE TABLE [dbo].[GeneralSettings] (
    [Id]             INT           IDENTITY (1, 1) NOT NULL,
    [CompanyId]      INT           NOT NULL,
    [SlotDuration]   INT           CONSTRAINT [DF_GeneralSettings_SlotDuration] DEFAULT ((30)) NOT NULL,
    [IsDeleted]      BIT           DEFAULT ((0)) NULL,
    [CreateByUserID] INT           NOT NULL,
    [CreateDate]     DATETIME2 (7) NOT NULL,
    [UpdateByUserID] INT           NULL,
    [UpdateDate]     DATETIME2 (7) NULL,
    CONSTRAINT [PK_GeneralSettings] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_GeneralSettings_Company_CompanyId] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([id])
);

