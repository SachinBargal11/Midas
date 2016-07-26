CREATE TABLE [dbo].[VisitType]
(
	[VisitTypeId] int identity(1,1) NOT NULL PRIMARY KEY,
	[VisitType] nvarchar(25) not null,
	[ColorCode] nvarchar(25) ,
	Orderby int not null,
	[AccountId] int,
	[MedicalOfficeId]int,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int ,
	IPAddress varchar(15)
	
)
