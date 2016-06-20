CREATE TABLE [dbo].[InsuranceAddress]
(
	[InsuranceAddressId] int NOT NULL PRIMARY KEY,
	[InsuranceId] int ,
	[AccountId] int,
	[OfficeId] int,
	[Address] nvarchar(500),
	[CityId] int,
	[Zip] int,
	[Default] bit,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int,
	IPAddress varchar(15)

)
