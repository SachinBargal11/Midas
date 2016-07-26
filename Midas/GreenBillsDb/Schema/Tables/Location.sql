CREATE TABLE [dbo].[Location]
(
	[LocationId] int identity(1,1) NOT NULL PRIMARY KEY,
	[Name] nvarchar(50) not null,
	[DisplayName] nvarchar(100) ,
    [Address] int,	
	[CityId]int,
	[Zip] nvarchar(15),
	[Email] nvarchar(100),
	[Phone] nvarchar(15),
	[Fax] nvarchar(15),
	[AccountId] int,
	[OfficeId] int,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int,
	IPAddress varchar(15)
   
)
