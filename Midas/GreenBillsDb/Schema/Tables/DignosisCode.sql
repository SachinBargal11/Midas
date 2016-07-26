CREATE TABLE [dbo].[DignosisCode]
(
	[DignosisCodeId] int identity(1,1) NOT NULL PRIMARY KEY,
	[Code] nvarchar(50) ,
	[Description] nvarchar(50),
	[DiagnosisTypeId] int,
	[Index] int,
	[AddedToPreferedLis] bit,
	[AccountId] int ,
	[OfficeId] int,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int,
	IPAddress varchar(15)  
	
	
)
