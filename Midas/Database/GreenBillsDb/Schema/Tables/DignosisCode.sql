CREATE TABLE [dbo].[DignosisCode]
(
	[DignosisCodeId] bigint identity(1,1) NOT NULL PRIMARY KEY,
	[Code] nvarchar(50) ,
	[Description] nvarchar(50),
	[DiagnosisTypeId] bigint,
	[Index] int,
	[AddedToPreferedLis] bit,
	[AccountId] bigint not null,
       
	CONSTRAINT [FK_DignosisCode_AccountID] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId),
	CONSTRAINT [FK_DignosisCode_DiagnosisTypeId] FOREIGN KEY ([DiagnosisTypeId]) REFERENCES [DiagnosisType](DiagnosisTypeId)
)
