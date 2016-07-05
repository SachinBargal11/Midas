CREATE TABLE [dbo].[CaseType]
(
	[CaseTypeId] int identity(1,1) NOT NULL PRIMARY KEY,
	[Name] nvarchar(50) not null,
	[AccountId] int,
	[OfficeId] int,
	[AbbreviationId] int,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int,
	
 
)
