CREATE TABLE [dbo].[Images]
(
	[ImageId] bigint identity(1,1) NOT NULL PRIMARY KEY,
	[Path] nvarchar(max),
	[FileName] nvarchar(1000),
	[Hide] bit,
	[UserId] bigint,
	[AccountId]bigint ,
		CONSTRAINT [FK_Images_UsersId] FOREIGN KEY ([UserId]) REFERENCES [User](UserId),
		CONSTRAINT [FK_Images_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId)
)
