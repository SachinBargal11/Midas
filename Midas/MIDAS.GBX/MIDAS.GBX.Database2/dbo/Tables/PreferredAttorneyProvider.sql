CREATE TABLE [dbo].[PreferredAttorneyProvider] (
    [Id]                     INT           IDENTITY (1, 1) NOT NULL,
    [PrefAttorneyProviderId] INT           NOT NULL,
    [CompanyId]              INT           NOT NULL,
    [IsCreated]              BIT           CONSTRAINT [DF_PreferredAttorneyProvider_IsCreated] DEFAULT ((0)) NOT NULL,
    [IsDeleted]              BIT           CONSTRAINT [DF_PreferredAttorneyProvider_IsDeleted] DEFAULT ((0)) NULL,
    [CreateByUserID]         INT           NOT NULL,
    [CreateDate]             DATETIME2 (7) NOT NULL,
    [UpdateByUserID]         INT           NULL,
    [UpdateDate]             DATETIME2 (7) NULL,
    CONSTRAINT [PK_PreferredAttorneyProvider] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_PreferredAttorneyProvider_Company_CompanyId] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([id]),
    CONSTRAINT [FK_PreferredAttorneyProvider_Company_PrefAttorneyProviderId] FOREIGN KEY ([PrefAttorneyProviderId]) REFERENCES [dbo].[Company] ([id])
);

