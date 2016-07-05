CREATE TABLE [dbo].[PacketRequest]
(
	PacketRequestId int identity(1,1),
	ZipFileName nvarchar(100),
	PacketPath nvarchar(20),
	IsError bit,
	ErrorMessge nvarchar(max),
	AccountId int,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int
)
