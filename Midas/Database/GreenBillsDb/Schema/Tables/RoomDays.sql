CREATE TABLE [dbo].[RoomSchedule]
(
	[RoomScheduleId] int identity(1,1) NOT NULL PRIMARY KEY,
	[RoomId] int,
	[Day] nvarchar(50),
	[StartTime] time,
	[EndtTime]  time,
	[EffectiveFrom] datetime,
	[EffectiveTo] datetime,
	[AccountId] int not null,
       CONSTRAINT [FK_RoomDays_RoomId] FOREIGN KEY ([RoomId]) REFERENCES [Room](RoomId),
	CONSTRAINT [FK_RoomDays_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId)
)
