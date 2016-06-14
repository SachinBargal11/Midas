CREATE TABLE [dbo].[DiagnosisType]
(
	[DiagnosisTypeId] bigint NOT NULL PRIMARY KEY,
	[Type] nvarchar(100)not null,
	[AccountId] bigint not null,
       
	CONSTRAINT [FK_DiagnosisType_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId)
)
