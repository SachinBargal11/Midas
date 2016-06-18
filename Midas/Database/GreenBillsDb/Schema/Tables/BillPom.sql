CREATE TABLE [dbo].[BillPom]
(
	[BillPomId] bigint identity(1,1) NOT NULL PRIMARY KEY,
	[POMId] bigint,
	[BillId] nvarchar(50),
	[AccountId] bigint
	CONSTRAINT [FK_BillPOM_BillId] FOREIGN KEY ([BillId]) REFERENCES [Bills](BillId),	
	CONSTRAINT [FK_BillPOM_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId),		
	CONSTRAINT [FK_BillPOM_POMId] FOREIGN KEY ([POMId]) REFERENCES [POM](POMId)
)
