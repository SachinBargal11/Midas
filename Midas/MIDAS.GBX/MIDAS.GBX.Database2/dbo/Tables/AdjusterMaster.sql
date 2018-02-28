CREATE TABLE [dbo].[AdjusterMaster] (
    [Id]                INT           IDENTITY (1, 1) NOT NULL,
    [CompanyId]         INT           NULL,
    [InsuranceMasterId] INT           NULL,
    [FirstName]         NVARCHAR (50) NOT NULL,
    [MiddleName]        NVARCHAR (50) NULL,
    [LastName]          NVARCHAR (50) NOT NULL,
    [AddressInfoId]     INT           NULL,
    [ContactInfoId]     INT           NULL,
    [IsDeleted]         BIT           CONSTRAINT [DF_AdjusterMaster_IsDeleted] DEFAULT 0 NULL,
    [CreateByUserID]    INT           NOT NULL,
    [CreateDate]        DATETIME2 (7) NOT NULL,
    [UpdateByUserID]    INT           NULL,
    [UpdateDate]        DATETIME2 (7) NULL,
    CONSTRAINT [PK_AdjusterMaster] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_AdjusterMaster_AddressInfo_AddressInfoId] FOREIGN KEY ([AddressInfoId]) REFERENCES [dbo].[AddressInfo] ([id]),
    CONSTRAINT [FK_AdjusterMaster_AddressInfo_ContactInfoId] FOREIGN KEY ([ContactInfoId]) REFERENCES [dbo].[ContactInfo] ([id]),
    CONSTRAINT [FK_AdjusterMaster_Company_CompanyId] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([id]),
    CONSTRAINT [FK_AdjusterMaster_InsuranceMaster_InsuranceMasterId] FOREIGN KEY ([InsuranceMasterId]) REFERENCES [dbo].[InsuranceMaster] ([Id])
);

