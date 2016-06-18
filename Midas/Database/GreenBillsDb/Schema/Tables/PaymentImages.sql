CREATE TABLE [dbo].[PaymentImages]
(
	[PaymentImageId] bigint identity(1,1) NOT NULL PRIMARY KEY,
	[ImageId] bigint,
	[Path] nvarchar(max),
	[FileName] nvarchar(1000),
	[AccountId]bigint ,
	[UserId] bigint,
	CONSTRAINT [FK_PaymentImages_UserId] FOREIGN KEY ([UserId]) REFERENCES [User](UserId),
	CONSTRAINT [FK_PaymentImages_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId),		
	CONSTRAINT [FK_PaymentImages_POMId] FOREIGN KEY ([ImageId]) REFERENCES [Images](ImageId)
)

