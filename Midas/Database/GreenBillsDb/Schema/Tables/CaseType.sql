CREATE TABLE [dbo].[CaseType]
(
	[CaseTypeId] bigint identity(1,1) NOT NULL PRIMARY KEY,
	[Name] nvarchar(50) not null,
	[AccountId] bigint,
	[AbbreviationId] bigint,
	CONSTRAINT [FK_CaseType_AbbreviationId] FOREIGN KEY ([AbbreviationId]) REFERENCES [Abbreviation](AbbreviationId),
	CONSTRAINT [FK_CaseType_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId) 
)
