CREATE TABLE [dbo].[BillVerificationAnswer]
(
	[VerificationAnswerId] bigint identity(1,1) NOT NULL PRIMARY KEY,
	[VerificationId] bigint,
	[BillId] nvarchar(50),
	[CaseId] bigint,
	[CreatedUserId] bigint,
	[Answer] nvarchar(max),
	[AccountId]bigint
	CONSTRAINT [FK_VerificationAnswer_VerificationId] FOREIGN KEY ([VerificationId]) REFERENCES [BillVerification](VerificationId),
	CONSTRAINT [FK_VerificationAnswer_CaseId] FOREIGN KEY ([CaseId]) REFERENCES [Case](CaseId),
    CONSTRAINT [FK_VerificationAnswer_BillId] FOREIGN KEY ([BillId]) REFERENCES [Bills](BillId),
	CONSTRAINT [FK_VerificationAnswer_CreatedUserId] FOREIGN KEY ([CreatedUserId]) REFERENCES [User](UserId ),
	CONSTRAINT [FK_VerificationAnswer_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId),
)
