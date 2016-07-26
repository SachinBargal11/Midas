CREATE TABLE [dbo].[Payment]
(
	[PaymentId] int identity(1,1) NOT NULL PRIMARY KEY,
	[ChequeNumber] nvarchar(50),
	[ChequeDate] datetime,
	[ChequeAmount] money,
	[BillId] nvarchar(50),
	[PaymentFrom] nvarchar(50),
	[Interest] money,
	[PaymentType] int,
	[Comment] nvarchar(1000),	
	[AccountId] int,
	[OfficeId] int,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int,
	IPAddress varchar(15)
	
)
