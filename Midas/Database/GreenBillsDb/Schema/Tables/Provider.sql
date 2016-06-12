CREATE TABLE [dbo].[Provider]
(
	[ProviderId] bigint identity(1,1) NOT NULL PRIMARY KEY,
	[Name] nvarchar(100) not null,
	[NPI] nvarchar(50),
	[FederalTaxId] nvarchar(50),
	[Prefix] nvarchar(5),
	[LocationId] bigint,
	[IsSoftwareFeeAdded] bit,
	[SoftwareFee] money,
	[PlaceOfService] int,
	[IsReferring] bit,
	[AddressId] bigint,	
	[BillingAddressId] bigint,	
	[ContactInfoId] bigint,
	[BillingContactInfoId] bigint,
	[AccountId] bigint not null,
    CONSTRAINT [FK_Provider_AddressId] FOREIGN KEY (AddressId) REFERENCES Address(AddressId),     
	CONSTRAINT [FK_Provider_BillingAddressId] FOREIGN KEY (BillingAddressId) REFERENCES Address(AddressId),  
	CONSTRAINT [FK_Provider_ContactId] FOREIGN KEY ([ContactInfoId]) REFERENCES [ContactInfo](ContactInfoId),
	CONSTRAINT [FK_Provider_BillingContactId] FOREIGN KEY ([BillingContactInfoId]) REFERENCES [ContactInfo](ContactInfoId),   
	CONSTRAINT [FK_Provider_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId)

)
