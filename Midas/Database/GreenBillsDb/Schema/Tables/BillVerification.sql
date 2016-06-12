CREATE TABLE [dbo].[BillVerification]
(
	[VerificationId] bigint identity(1,1) NOT NULL PRIMARY KEY,
	[BillId] nvarchar(50),
	[Description] nvarchar(max),
	[VeriFicationDate] datetime,
	[VerificationType] int,
	[AccountId] bigint,
	[CreatedDate] Datetime,
	[CreatedUserId] bigint,
	[DenailReasons] nvarchar(50),
	[TransactionId] bigint,

	CONSTRAINT [FK_BillVerification_BillId] FOREIGN KEY ([BillId]) REFERENCES [Bills](BillId),
	CONSTRAINT [FK_BillVerification_CreatedUserId] FOREIGN KEY ([CreatedUserId]) REFERENCES [User](UserId ),
	CONSTRAINT [FK_BillVerification_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId),
)
