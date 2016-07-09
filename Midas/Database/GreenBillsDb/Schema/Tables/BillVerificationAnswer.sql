CREATE TABLE [dbo].[BillVerificationAnswer]
(
	[VerificationAnswerId] int identity(1,1) NOT NULL PRIMARY KEY,
	[VerificationId] int,
	[BillId] nvarchar(50),
	[CaseId] int,	
	[Answer] nvarchar(max),
	[AccountId]int,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int
	
)
