CREATE TABLE [dbo].[RoomDays]
(
	[RoomDayId] bigint identity(1,1) NOT NULL PRIMARY KEY,
	[RoomId] bigint,
	[Day] nvarchar(50),
	[StartTime] numeric(13,2),
	[EndtTime] numeric(13,2),
	[EffectiveFrom] datetime,
	[EffectiveTo] datetime,
	[AccountId] bigint not null,
       CONSTRAINT [FK_RoomDays_RoomId] FOREIGN KEY ([RoomId]) REFERENCES [Room](RoomId),
	CONSTRAINT [FK_RoomDays_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId)
)
