CREATE TABLE [dbo].[BillStatus]
(
	[BillStatusId] bigint identity(1,1) NOT NULL PRIMARY KEY,
	[Name] nvarchar(50) not null,
	[code] nvarchar(10) not null,
	[IsSelect] bit,
	[AccountId] bigint,
	CONSTRAINT [FK_BillStatus_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId) 
)
