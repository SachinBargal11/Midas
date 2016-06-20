CREATE TABLE [dbo].[Room]
(
	[RoomId] int identity(1,1) NOT NULL PRIMARY KEY,
	[RoomName] nvarchar(50),

	[SpecialtyId] int,
	[AccountId] int ,
	[OfficeId]int,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int
       
	
)
