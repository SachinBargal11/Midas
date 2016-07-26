CREATE TABLE [dbo].[DiagnosisType]
(
	[DiagnosisTypeId] int NOT NULL PRIMARY KEY,
	[Type] nvarchar(100)not null,
	[AccountId] int null,
	[OfficeId] int,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int,
     IPAddress varchar(15)  
	
)
