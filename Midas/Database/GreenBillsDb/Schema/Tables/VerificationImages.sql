CREATE TABLE [dbo].[VerificationImages]
(
	[VerificationImagesId] bigint NOT NULL PRIMARY KEY,
	[BillId] nvarchar(50),
	[AccountId]bigint,
	[ImageId] bigint,
	[CreatedDate] datetime,
	[CreatedUserId] bigint,
	[VerificationId] bigint,
	[VerificationImagePath] nvarchar(max)
	CONSTRAINT [FK_VerificationImage_ImageId] FOREIGN KEY ([ImageId]) REFERENCES [Images](ImageId)
	CONSTRAINT [FK_VerificationImages_VerificationId] FOREIGN KEY ([VerificationId]) REFERENCES [BillVerification](VerificationId),
	CONSTRAINT [FK_VerificationImages_CreatedUserId] FOREIGN KEY ([CreatedUserId]) REFERENCES [User](UserId ),
	CONSTRAINT [FK_VerificationImages_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId),
	CONSTRAINT [FK_VerificationImages_BillId] FOREIGN KEY ([BillId]) REFERENCES [Bills](BillId),
)
