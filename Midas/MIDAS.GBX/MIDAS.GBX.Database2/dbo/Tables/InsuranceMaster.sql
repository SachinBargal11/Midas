CREATE TABLE [dbo].[InsuranceMaster] (
    [Id]                 INT            IDENTITY (1, 1) NOT NULL,
    [CompanyCode]        NVARCHAR (10)  NOT NULL,
    [CompanyName]        NVARCHAR (100) NOT NULL,
    [AddressInfoId]      INT            NULL,
    [ContactInfoId]      INT            NULL,
    [IsDeleted]          BIT            DEFAULT ((0)) NULL,
    [CreateByUserID]     INT            NOT NULL,
    [CreateDate]         DATETIME2 (7)  NOT NULL,
    [UpdateByUserID]     INT            NULL,
    [UpdateDate]         DATETIME2 (7)  NULL,
    [CreatedByCompanyId] INT            NULL,
    [ZeusID]             NVARCHAR (50)  NULL,
    [PriorityBilling]    INT            NULL,
    [Only1500Form]       INT            NULL,
    [PaperAuthorization] INT            NULL,
    CONSTRAINT [PK_InsuranceMaster] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_InsuranceMaster_AddressInfo_AddressInfoId] FOREIGN KEY ([AddressInfoId]) REFERENCES [dbo].[AddressInfo] ([id]),
    CONSTRAINT [FK_InsuranceMaster_AddressInfo_ContactInfoId] FOREIGN KEY ([ContactInfoId]) REFERENCES [dbo].[ContactInfo] ([id]),
    CONSTRAINT [FK_InsuranceMaster_Company_CreatedByCompanyId] FOREIGN KEY ([CreatedByCompanyId]) REFERENCES [dbo].[Company] ([id])
);

