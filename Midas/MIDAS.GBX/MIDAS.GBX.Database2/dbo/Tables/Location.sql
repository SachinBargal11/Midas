CREATE TABLE [dbo].[Location] (
    [id]                        INT            IDENTITY (1, 1) NOT NULL,
    [Name]                      NVARCHAR (100) NOT NULL,
    [CompanyID]                 INT            NOT NULL,
    [ScheduleID]                INT            NULL,
    [AddressInfoID]             INT            NOT NULL,
    [ContactInfoID]             INT            NOT NULL,
    [LocationType]              TINYINT        NOT NULL,
    [IsDefault]                 BIT            NOT NULL,
    [IsDeleted]                 BIT            CONSTRAINT [DF_Location_IsDeleted] DEFAULT ((0)) NULL,
    [CreateByUserID]            INT            NOT NULL,
    [CreateDate]                DATETIME2 (7)  NOT NULL,
    [UpdateByUserID]            INT            NULL,
    [UpdateDate]                DATETIME2 (7)  NULL,
    [HandicapRamp]              BIT            CONSTRAINT [DF_Location_HandicapRamp] DEFAULT ((0)) NOT NULL,
    [StairsToOffice]            BIT            CONSTRAINT [DF_Location_StairsToOffice] DEFAULT ((0)) NOT NULL,
    [PublicTransportNearOffice] BIT            CONSTRAINT [DF_Location_PublicTransportNearOffice] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_Location] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_Location_AddressInfo] FOREIGN KEY ([AddressInfoID]) REFERENCES [dbo].[AddressInfo] ([id]),
    CONSTRAINT [FK_Location_Company] FOREIGN KEY ([CompanyID]) REFERENCES [dbo].[Company] ([id]),
    CONSTRAINT [FK_Location_ContactInfo] FOREIGN KEY ([ContactInfoID]) REFERENCES [dbo].[ContactInfo] ([id]),
    CONSTRAINT [FK_Location_Schedule] FOREIGN KEY ([ScheduleID]) REFERENCES [dbo].[Schedule] ([id])
);

