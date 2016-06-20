CREATE TABLE [dbo].[POM]
(
	[POMId] bigint identity(1,1) NOT NULL PRIMARY KEY,
	[POMDate] datetime,
	[ImageId] bigint,
	[Path] nvarchar(max),
	[FileName] nvarchar(1000),
	[AccountId]bigint ,
	[PomType] int,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int,
	IPAddress varchar(15)
	
)
