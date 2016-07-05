CREATE TABLE [dbo].[CaseStatus]
(
	[CaseStatusId] int identity(1,1) NOT NULL PRIMARY KEY,
	[Name] nvarchar(25) not null,
	[IsArchived] bit,
	[AccountId] int,
	[OfficeId] int,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int,
	
	
)
