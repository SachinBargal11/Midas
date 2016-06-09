CREATE TABLE [dbo].[Attorney]
(
	[AttorneyId] BIGINT identity(1,1) NOT NULL PRIMARY KEY,
	[FirstName] nvarchar(50) not null,
	[LastName] nvarchar(50)not null,
	[AddressId] bigint,
	[ContactInfoId] bigint,
	[IsDefault] bit, 
	[AccountId] bigint not null,
    CONSTRAINT [FK_Attorney_AddressId] FOREIGN KEY (AddressId) REFERENCES Address(AddressId), 
    CONSTRAINT [FK_Attorney_ContactId] FOREIGN KEY ([ContactInfoId]) REFERENCES [ContactInfo](ContactInfoId),
	CONSTRAINT [FK_Attorney_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId)

)
