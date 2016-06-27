CREATE TABLE [dbo].[State]
(
	[StateId] INT identity(1,1) NOT NULL PRIMARY KEY,
	[Name] nvarchar(50),
	[Code] nvarchar(5),
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int,
	IPAddress varchar(15)
)
