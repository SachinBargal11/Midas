CREATE TABLE [dbo].[CaseStatus]
(
	[CaseStatusId] bigint identity(1,1) NOT NULL PRIMARY KEY,
	[Name] nvarchar(25) not null,
	[IsArchived] bit,
	[AccountId] bigint,
	CONSTRAINT [FK_CaseStatus_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId) 
)
