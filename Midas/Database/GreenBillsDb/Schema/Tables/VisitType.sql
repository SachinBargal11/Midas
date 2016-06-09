CREATE TABLE [dbo].[VisitType]
(
	[VisitId] bigint identity(1,1) NOT NULL PRIMARY KEY,
	[VisitType] nvarchar(25) not null,
	[ColorCode] nvarchar(25) ,
	Orderby int not null,
	[AccountId] bigint,
	CONSTRAINT [FK_VisitType_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId) 
)
