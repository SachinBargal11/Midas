CREATE TABLE [dbo].[PreferredAncillaryProvider] (
    [Id]                      INT           IDENTITY (1, 1) NOT NULL,
    [PrefAncillaryProviderId] INT           NOT NULL,
    [CompanyId]               INT           NOT NULL,
    [IsCreated]               BIT           CONSTRAINT [DF_PreferredAncillaryProvider_IsCreated] DEFAULT ((0)) NOT NULL,
    [IsDeleted]               BIT           CONSTRAINT [DF_PreferredAncillaryProvider_IsDeleted] DEFAULT ((0)) NULL,
    [CreateByUserID]          INT           NOT NULL,
    [CreateDate]              DATETIME2 (7) NOT NULL,
    [UpdateByUserID]          INT           NULL,
    [UpdateDate]              DATETIME2 (7) NULL,
    CONSTRAINT [PK_PreferredAncillaryProvider] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_PreferredAncillaryProvider_Company_CompanyId] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([id]),
    CONSTRAINT [FK_PreferredAncillaryProvider_Company_PrefAncillaryProviderId] FOREIGN KEY ([PrefAncillaryProviderId]) REFERENCES [dbo].[Company] ([id])
);

