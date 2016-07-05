CREATE TABLE [dbo].[BillVerification](
	[VerificationId] int identity(1,1) NOT NULL PRIMARY KEY,
	[BillId] nvarchar(50),
	[Description] nvarchar(max),
	[VeriFicationDate] datetime,
	[VerificationType] int,
	[AccountId] int,
	[DenailReasons] nvarchar(50),
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int

	
)
