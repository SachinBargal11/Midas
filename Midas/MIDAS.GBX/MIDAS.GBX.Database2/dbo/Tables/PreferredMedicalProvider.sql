CREATE TABLE [dbo].[PreferredMedicalProvider] (
    [Id]                INT           IDENTITY (1, 1) NOT NULL,
    [PrefMedProviderId] INT           NOT NULL,
    [CompanyId]         INT           NOT NULL,
    [IsCreated]         BIT           CONSTRAINT [DF_PreferredMedicalProvider_IsCreated] DEFAULT ((0)) NOT NULL,
    [IsDeleted]         BIT           CONSTRAINT [DF_PreferredMedicalProvider_IsDeleted] DEFAULT ((0)) NULL,
    [CreateByUserID]    INT           NOT NULL,
    [CreateDate]        DATETIME2 (7) NOT NULL,
    [UpdateByUserID]    INT           NULL,
    [UpdateDate]        DATETIME2 (7) NULL,
    CONSTRAINT [PK_PreferredMedicalProvider] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_PreferredMedicalProvider_Company_CompanyId] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([id]),
    CONSTRAINT [FK_PreferredMedicalProvider_Company_PrefMedProviderId] FOREIGN KEY ([PrefMedProviderId]) REFERENCES [dbo].[Company] ([id])
);

