CREATE TABLE [dbo].[PatientPersonalSettings] (
    [Id]                           INT           IDENTITY (1, 1) NOT NULL,
    [PatientId]                    INT           NOT NULL,
    [PreferredModeOfCommunication] INT           CONSTRAINT [DF_PatientPersonalSettings_PreferredModeOfCommunication] DEFAULT ((3)) NOT NULL,
    [IsPushNotificationEnabled]    BIT           CONSTRAINT [DF_PatientPersonalSettings_IsPushNotificationEnabled] DEFAULT ((1)) NOT NULL,
    [CalendarViewId]               TINYINT       CONSTRAINT [DF_PatientPersonalSettings_CalendarViewId] DEFAULT ((1)) NOT NULL,
    [PreferredUIViewId]            TINYINT       CONSTRAINT [DF_PatientPersonalSettings_PreferredUIViewId] DEFAULT ((1)) NOT NULL,
    [IsDeleted]                    BIT           DEFAULT ((0)) NULL,
    [CreateByUserID]               INT           NOT NULL,
    [CreateDate]                   DATETIME2 (7) NOT NULL,
    [UpdateByUserID]               INT           NULL,
    [UpdateDate]                   DATETIME2 (7) NULL,
    CONSTRAINT [PK_PatientPersonalSettings] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_PatientPersonalSettings_Patient_PatientId] FOREIGN KEY ([PatientId]) REFERENCES [dbo].[Patient] ([Id])
);

