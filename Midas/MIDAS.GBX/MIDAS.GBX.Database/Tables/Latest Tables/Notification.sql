
CREATE TABLE [dbo].[Notification](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CompanyId] [int] NULL,
	[LocationId] [int] NULL,
	[NotificationMessage] [nvarchar](100) NULL,
	[StartDate] [datetime2](7) NULL,
	[EndDate] [datetime2](7) NULL,
	[IsViewed] [bit] NOT NULL DEFAULT 0,
	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
	CONSTRAINT [PK_Notification] PRIMARY KEY ([Id])
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Notification]  WITH CHECK ADD  CONSTRAINT [FK_Notification_Company_CompanyId] FOREIGN KEY([CompanyId])
	REFERENCES [dbo].[Company] ([Id])
GO

ALTER TABLE [dbo].[Notification] CHECK CONSTRAINT [FK_Notification_Company_CompanyId]
GO

ALTER TABLE [dbo].[Notification]  WITH CHECK ADD  CONSTRAINT [FK_Notification_Location_LocationId] FOREIGN KEY([LocationId])
	REFERENCES [dbo].[Location] ([Id])
GO

ALTER TABLE [dbo].[Notification] CHECK CONSTRAINT [FK_Notification_Location_LocationId]
GO
