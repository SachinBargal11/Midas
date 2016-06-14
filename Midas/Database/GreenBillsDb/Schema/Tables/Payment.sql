CREATE TABLE [dbo].[Payment]
(
	[PaymentId] bigint identity(1,1) NOT NULL PRIMARY KEY,
	[CheckNumber] nvarchar(50),
	[CheckDate] datetime,
	[CheckAmount] money,
	[UserId] bigint,
	[BillId] nvarchar(50),
	[PaymentFrom] nvarchar(50),
	[Interest] money,
	[PaymentType] int,
	[Comment] nvarchar(1000),
	
	[AccountId] bigint
	CONSTRAINT [FK_Payment_UserId] FOREIGN KEY ([UserId]) REFERENCES [User](UserId)
	CONSTRAINT [FK_Payment_BillId] FOREIGN KEY ([BillId]) REFERENCES [Bills](BillId),	
	CONSTRAINT [FK_Payment_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId),	
)
