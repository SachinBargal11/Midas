CREATE TABLE [dbo].[Company] (
    [id]                   INT           IDENTITY (1, 1) NOT NULL,
    [Name]                 NVARCHAR (50) NOT NULL,
    [Status]               TINYINT       NOT NULL,
    [CompanyType]          INT           NOT NULL,
    [SubscriptionPlanType] INT           NULL,
    [TaxID]                NVARCHAR (10) NULL,
    [AddressId]            INT           NOT NULL,
    [ContactInfoID]        INT           NOT NULL,
    [IsDeleted]            BIT           CONSTRAINT [DF_Company_IsDeleted] DEFAULT ((0)) NULL,
    [CreateByUserID]       INT           NOT NULL,
    [CreateDate]           DATETIME2 (7) NOT NULL,
    [UpdateByUserID]       INT           NULL,
    [UpdateDate]           DATETIME2 (7) NULL,
    [BlobStorageTypeId]    INT           CONSTRAINT [DF_Company_BlobStorageTypeId] DEFAULT ((1)) NULL,
    [CompanyStatusTypeID]  INT           DEFAULT ((1)) NOT NULL,
    CONSTRAINT [PK_Company] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_Company_AddressInfo] FOREIGN KEY ([AddressId]) REFERENCES [dbo].[AddressInfo] ([id]),
    CONSTRAINT [FK_Company_BlobStorageType_BlobStorageTypeId] FOREIGN KEY ([BlobStorageTypeId]) REFERENCES [dbo].[BlobStorageType] ([Id]),
    CONSTRAINT [FK_Company_CompanyStatusType_CompanyStatusTypeID] FOREIGN KEY ([CompanyStatusTypeID]) REFERENCES [dbo].[CompanyStatusType] ([ID]),
    CONSTRAINT [FK_Company_CompanyType] FOREIGN KEY ([CompanyType]) REFERENCES [dbo].[CompanyType] ([id]),
    CONSTRAINT [FK_Company_ContactInfo] FOREIGN KEY ([ContactInfoID]) REFERENCES [dbo].[ContactInfo] ([id]),
    CONSTRAINT [FK_Company_SubscriptionPlan] FOREIGN KEY ([SubscriptionPlanType]) REFERENCES [dbo].[SubscriptionPlan] ([id])
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_Company_Name]
    ON [dbo].[Company]([Name] ASC);

