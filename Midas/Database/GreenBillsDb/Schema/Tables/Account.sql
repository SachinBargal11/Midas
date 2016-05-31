CREATE TABLE [dbo].[Account]
(
	[Id]	INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[Name]	NVARCHAR(50) NOT NULL ,
	[Status] TINYINT NOT NULL Default(0),
	[DefaultAddressId] INT NOT NULL,
	[OwnerId] INT NOT NULL
)
