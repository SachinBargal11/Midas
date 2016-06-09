CREATE TABLE [dbo].[Location]
(
	[LocationId] bigint identity(1,1) NOT NULL PRIMARY KEY,
	[Name] nvarchar(50) not null,
	[DisplayName] nvarchar(100) ,
    [AddressId] bigint,	
	[AccountId] bigint not null,
    CONSTRAINT [FK_Location_AddressId] FOREIGN KEY (AddressId) REFERENCES Address(AddressId),     
	CONSTRAINT [FK_Location_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId)
)
