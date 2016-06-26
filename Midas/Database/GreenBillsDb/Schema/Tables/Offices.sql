CREATE TABLE [dbo].[Offices]
(
	[OfficeId] INT identity(1,1) NOT NULL PRIMARY KEY,
	[Name] nvarchar(100),
	[AddressId] int ,
	[ContactInfoId] int ,
	
	[Prefix] nvarchar(2),
	[LastLogin] datetime,
	[Type] int,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int


	CONSTRAINT [FK_Ofiice_AddressId] FOREIGN KEY (AddressId) REFERENCES Address(AddressId), 
)
