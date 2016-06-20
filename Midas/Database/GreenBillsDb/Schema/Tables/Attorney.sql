CREATE TABLE [dbo].[Attorney]
(
	[AttorneyId] INT identity(1,1) NOT NULL PRIMARY KEY,
	[FirstName] nvarchar(50) not null,
	[LastName] nvarchar(50)not null,
	[AddressId] INT,
	[ContactInfoId] INT,
	[IsDefault] bit, 
	[AccountId] INT not null,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int
    CONSTRAINT [FK_Attorney_AddressId] FOREIGN KEY (AddressId) REFERENCES Address(AddressId), 
    CONSTRAINT [FK_Attorney_ContactId] FOREIGN KEY ([ContactInfoId]) REFERENCES [ContactInfo](ContactInfoId),
	CONSTRAINT [FK_Attorney_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId)

)
