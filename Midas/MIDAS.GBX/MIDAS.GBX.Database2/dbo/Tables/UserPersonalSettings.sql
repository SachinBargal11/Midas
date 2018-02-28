CREATE TABLE [dbo].[UserPersonalSettings] (
    [Id]                           INT           IDENTITY (1, 1) NOT NULL,
    [UserId]                       INT           NOT NULL,
    [CompanyId]                    INT           NOT NULL,
    [IsPublic]                     BIT           CONSTRAINT [DF_UserPersonalSettings_IsPublic] DEFAULT ((0)) NOT NULL,
    [IsSearchable]                 BIT           CONSTRAINT [DF_UserPersonalSettings_IsSearchable] DEFAULT ((0)) NOT NULL,
    [IsCalendarPublic]             BIT           CONSTRAINT [DF_UserPersonalSettings_IsCalendarPublic] DEFAULT ((0)) NOT NULL,
    [IsDeleted]                    BIT           DEFAULT ((0)) NULL,
    [CreateByUserID]               INT           NOT NULL,
    [CreateDate]                   DATETIME2 (7) NOT NULL,
    [UpdateByUserID]               INT           NULL,
    [UpdateDate]                   DATETIME2 (7) NULL,
    [SlotDuration]                 INT           DEFAULT ((30)) NOT NULL,
    [PreferredModeOfCommunication] INT           CONSTRAINT [DF_UserPersonalSettings_PreferredModeOfCommunication] DEFAULT ((3)) NOT NULL,
    [IsPushNotificationEnabled]    BIT           CONSTRAINT [DF_UserPersonalSettings_IsPushNotificationEnabled] DEFAULT ((1)) NOT NULL,
    [CalendarViewId]               TINYINT       CONSTRAINT [DF_UserPersonalSettings_CalendarViewId] DEFAULT ((1)) NOT NULL,
    [PreferredUIViewId]            TINYINT       CONSTRAINT [DF_UserPersonalSettings_PreferredUIViewId] DEFAULT ((1)) NOT NULL,
    CONSTRAINT [PK_UserPersonalSettings] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_UserPersonalSettings_CalendarView_CalendarViewId] FOREIGN KEY ([CalendarViewId]) REFERENCES [dbo].[CalendarView] ([Id]),
    CONSTRAINT [FK_UserPersonalSettings_Company_CompanyId] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([id]),
    CONSTRAINT [FK_UserPersonalSettings_PreferredUIView_PreferredUIViewId] FOREIGN KEY ([PreferredUIViewId]) REFERENCES [dbo].[PreferredUIView] ([Id]),
    CONSTRAINT [FK_UserPersonalSettings_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[User] ([id])
);

