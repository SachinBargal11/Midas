CREATE TABLE [dbo].[Account]
(
	[AccountId]	BIGINT NOT NULL PRIMARY KEY,
	[Name]	NVARCHAR(50) NOT NULL ,
	[Status] TINYINT NOT NULL Default(0),
	[AddressId] INT NOT NULL,
	[OwnerId] INT NOT NULL, 
    CONSTRAINT [FK_Account_Address] FOREIGN KEY ([AddressId]) REFERENCES [Account]([AddressId]) 
)
