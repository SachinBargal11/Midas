CREATE TABLE [dbo].[ProcedureCode]
(
	[ProcedureCodeId] int identity(1,1) NOT NULL PRIMARY KEY,
	[code] nvarchar(20),
	[Description] nvarchar(250),
	[Amount] money,
	[IsBilable] bit,
	[ShowToDoctor] bit,
	[IsAddedToPreferredList] bit,
	[LongDescription] nvarchar(1000),
	[Modifier] nvarchar(20),
	[RVU] nvarchar(200),
	[ValueCode] nvarchar(200),
	[LongModifier] nvarchar(100),
	[LocationId] int,
	[SpecialtyId] int,
	[RoomId] int,
	[AccountId] int,
	[OfficeId] int,	
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int,
	IPAddress varchar(15)
	

)
