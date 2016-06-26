CREATE TABLE [dbo].[Owner]
(
	[OwnerId] int NOT NULL PRIMARY KEY, 
    [Name] NVARCHAR(50) NOT NULL, 
    [AddressId] TINYINT NOT NULL, 
    [ContactInfoId] TINYINT NOT NULL, 
    )
