CREATE TABLE [dbo].[EmployerAddress]
(
	[EmployerAddressId] int NOT NULL PRIMARY KEY,
	[UserEmployerId] int ,
	[AccountId] int,
	[Address] nvarchar(500),
	[CityId] int,
	[Zip] int,
	[Default] bit,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int
	
)
