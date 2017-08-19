CREATE TABLE [dbo].[UserPersonalSettings]
(	
    [Id] INT NOT NULL IDENTITY, 
    [UserId] INT NOT NULL, 
    [CompanyId] INT NOT NULL,
    [IsPublic] BIT NOT NULL CONSTRAINT [DF_UserPersonalSettings_IsPublic] DEFAULT 0, 
    [IsSearchable] BIT NOT NULL CONSTRAINT [DF_UserPersonalSettings_IsSearchable] DEFAULT 0, 
    [IsCalendarPublic] BIT NOT NULL CONSTRAINT [DF_UserPersonalSettings_IsCalendarPublic] DEFAULT 0,
    [SlotDuration] INT NOT NULL CONSTRAINT [DF_UserPersonalSettings_SlotDuration] DEFAULT 30, 
    [PreferredModeOfCommunication] INT NOT NULL CONSTRAINT [DF_UserPersonalSettings_PreferredModeOfCommunication] DEFAULT 3,
    [IsPushNotificationEnabled] BIT NOT NULL CONSTRAINT [DF_UserPersonalSettings_IsPushNotificationEnabled] DEFAULT 1,

    [IsDeleted] [bit] NULL DEFAULT 0,
    [CreateByUserID] [int] NOT NULL,
    [CreateDate] [datetime2](7) NOT NULL,
    [UpdateByUserID] [int] NULL,
    [UpdateDate] [datetime2](7) NULL, 
    CONSTRAINT [PK_UserPersonalSettings] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[UserPersonalSettings]  WITH CHECK ADD  CONSTRAINT [FK_UserPersonalSettings_User_UserId] FOREIGN KEY([UserId])
	REFERENCES [dbo].[User] ([Id])
GO

ALTER TABLE [dbo].[UserPersonalSettings] CHECK CONSTRAINT [FK_UserPersonalSettings_User_UserId]
GO

ALTER TABLE [dbo].[UserPersonalSettings]  WITH CHECK ADD  CONSTRAINT [FK_UserPersonalSettings_Company_CompanyId] FOREIGN KEY([CompanyId])
	REFERENCES [dbo].[Company] ([Id])
GO

ALTER TABLE [dbo].[UserPersonalSettings] CHECK CONSTRAINT [FK_UserPersonalSettings_Company_CompanyId]
GO

/*
ALTER TABLE [dbo].[UserPersonalSettings] ADD [SlotDuration] INT NOT NULL CONSTRAINT [DF_UserPersonalSettings_SlotDuration] DEFAULT 30
*/
/*
ALTER TABLE [dbo].[UserPersonalSettings] ADD [PreferredModeOfCommunication] INT NOT NULL CONSTRAINT [DF_UserPersonalSettings_PreferredModeOfCommunication] DEFAULT 3
GO
ALTER TABLE [dbo].[UserPersonalSettings] ADD [IsPushNotificationEnabled] BIT NOT NULL CONSTRAINT [DF_UserPersonalSettings_IsPushNotificationEnabled] DEFAULT 1
GO
*/