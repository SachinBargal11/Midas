CREATE TABLE [dbo].[Account]
(
	[AccountId]	INT NOT NULL PRIMARY KEY,
	[Name]	NVARCHAR(50) NOT NULL ,
	[Status] TINYINT NOT NULL Default(0),
	[AddressId] INT NOT NULL,
	[OwnerId] INT NOT NULL, 
    
)
