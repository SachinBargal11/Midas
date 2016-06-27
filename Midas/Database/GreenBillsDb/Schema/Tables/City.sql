CREATE TABLE [dbo].[City]
(
	[CityId] INT identity(1,1) NOT NULL PRIMARY KEY,
	[Name] nvarchar(50),
	[StateId] int,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int,
	IPAddress varchar(15)
)
