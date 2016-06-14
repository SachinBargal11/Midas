CREATE TABLE [dbo].[Room]
(
	[RoomId] bigint identity(1,1) NOT NULL PRIMARY KEY,
	[RoomName] nvarchar(50),
	[StartTime] numeric(13,2),
	[EndtTime] numeric(13,2),
	[SpecialtyId] bigint,
	[AccountId] bigint not null,
       
	CONSTRAINT [FK_Room_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId)
)
