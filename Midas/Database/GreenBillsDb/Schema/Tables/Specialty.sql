CREATE TABLE [dbo].[Specialty]
(
	[SpecialtyId] int identity(1,1) NOT NULL PRIMARY KEY,
	[Name] nvarchar(50) not null,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int,
	IPAddress varchar(15),
)
