CREATE TABLE [dbo].[POM]
(
	[POMId] bigint identity(1,1) NOT NULL PRIMARY KEY,
	[POMDate] datetime,
	[ImageId] bigint,
	[Path] nvarchar(max),
	[FileName] nvarchar(1000),
	[AccountId]bigint ,
	[UserId] bigint
	CONSTRAINT [FK_Images_UserId] FOREIGN KEY ([UserId]) REFERENCES [User](UserId),
		CONSTRAINT [FK_POM_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId),
		CONSTRAINT [FK_POM_ImageId] FOREIGN KEY ([ImageId]) REFERENCES [Images](ImageId)
)
