CREATE TABLE [dbo].[Adjuster]
(
	[AdjusterId] INT identity(1,1) NOT NULL PRIMARY KEY,
	[FirstName] nvarchar(50) not null,
	[LastName] nvarchar(50)not null,
	[AddressId] INT,
	[ContactInfoId] INT,
	[AccountId] INT not null,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int
    CONSTRAINT [FK_Adjuster_AddressId] FOREIGN KEY (AddressId) REFERENCES Address(AddressId), 
    CONSTRAINT [FK_Adjuster_ContactId] FOREIGN KEY ([ContactInfoId]) REFERENCES [ContactInfo](ContactInfoId),
	CONSTRAINT [FK_Adjuster_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId)
	)