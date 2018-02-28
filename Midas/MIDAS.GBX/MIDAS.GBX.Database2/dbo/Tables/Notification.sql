CREATE TABLE [dbo].[Notification] (
    [Id]                  INT            IDENTITY (1, 1) NOT NULL,
    [CompanyId]           INT            NULL,
    [LocationId]          INT            NULL,
    [NotificationMessage] NVARCHAR (100) NULL,
    [StartDate]           DATETIME2 (7)  NULL,
    [EndDate]             DATETIME2 (7)  NULL,
    [IsViewed]            BIT            DEFAULT ((0)) NOT NULL,
    [IsDeleted]           BIT            NULL,
    [CreateByUserID]      INT            NOT NULL,
    [CreateDate]          DATETIME2 (7)  NOT NULL,
    [UpdateByUserID]      INT            NULL,
    [UpdateDate]          DATETIME2 (7)  NULL,
    CONSTRAINT [PK_Notification] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Notification_Company_CompanyId] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([id]),
    CONSTRAINT [FK_Notification_Location_LocationId] FOREIGN KEY ([LocationId]) REFERENCES [dbo].[Location] ([id])
);

