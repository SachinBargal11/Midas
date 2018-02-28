CREATE TABLE [dbo].[Room](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[ContactPersonName] [nvarchar](50) NOT NULL,
	[Phone] [nvarchar](20) NOT NULL,
	[ScheduleID] [int] NULL,
	[LocationID] [int] NOT NULL,
	[RoomTestID] [int] NOT NULL,
	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
	CONSTRAINT [PK_Room] PRIMARY KEY ([Id])
 )
GO

ALTER TABLE [dbo].[Room]  WITH CHECK ADD  CONSTRAINT [FK_Room_Location] FOREIGN KEY([LocationID])
	REFERENCES [dbo].[Location] ([id])
GO

ALTER TABLE [dbo].[Room] CHECK CONSTRAINT [FK_Room_Location]
GO

ALTER TABLE [dbo].[Room]  WITH CHECK ADD  CONSTRAINT [FK_Room_RoomTest] FOREIGN KEY([RoomTestID])
	REFERENCES [dbo].[RoomTest] ([id])
GO

ALTER TABLE [dbo].[Room] CHECK CONSTRAINT [FK_Room_RoomTest]
GO

ALTER TABLE [dbo].[Room]  WITH CHECK ADD  CONSTRAINT [FK_Room_Schedule] FOREIGN KEY([ScheduleID])
	REFERENCES [dbo].[Schedule] ([id])
GO

ALTER TABLE [dbo].[Room] CHECK CONSTRAINT [FK_Room_Schedule]
GO