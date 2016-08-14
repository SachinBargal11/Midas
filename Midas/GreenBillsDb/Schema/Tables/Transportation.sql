CREATE TABLE [dbo].[Transportation]
(
	[TransportationId] INT identity(1,1) NOT NULL PRIMARY KEY,
	[Name] nvarchar(100) not null,	
	[AddressId] int,
	[ContactInfoId] int,
	[AccountId] int not null,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int,
   IPAddress varchar(15)
	)
