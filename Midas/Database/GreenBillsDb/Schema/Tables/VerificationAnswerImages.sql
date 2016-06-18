CREATE TABLE [dbo].[VerificationAnswerImages]
(
	[AnswerImagesId] bigint identity(1,1) NOT NULL PRIMARY KEY,
	[BillId] nvarchar(50),
	[AccountId]bigint,
	[ImageId] bigint,
	[CreatedDate] datetime,
	[CreatedUserId] bigint,
	[VerificationId] bigint,
	[VerificationAnswerId] bigint,
	[AnswerImagePath] nvarchar(max)
	CONSTRAINT [FK_AnswerImages_ImageId] FOREIGN KEY ([ImageId]) REFERENCES [Images](ImageId)
	CONSTRAINT [FK_VerificationAnswerImages_VerificationAnswerId] FOREIGN KEY ([VerificationAnswerId]) REFERENCES [BillVerificationAnswer](VerificationAnswerId),
	CONSTRAINT [FK_VerificationAnswerImages_VerificationId] FOREIGN KEY ([VerificationId]) REFERENCES [BillVerification](VerificationId),
	CONSTRAINT [FK_VerificationAnswerImages_CreatedUserId] FOREIGN KEY ([CreatedUserId]) REFERENCES [User](UserId ),
	CONSTRAINT [FK_VerificationAnswerImages_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId),
	CONSTRAINT [FK_VerificationAnswerImages_BillId] FOREIGN KEY ([BillId]) REFERENCES [Bills](BillId),
)
