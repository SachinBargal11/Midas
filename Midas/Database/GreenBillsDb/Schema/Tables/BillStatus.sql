CREATE TABLE [dbo].[BillStatus]
(
	[BillStatusId] INT identity(1,1) NOT NULL PRIMARY KEY,
	[Name] nvarchar(50) not null,
	[code] nvarchar(10) not null,
	[IsSelect] bit,
	[AccountId] INT,
	[OfficeId] int,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int,
	
)
