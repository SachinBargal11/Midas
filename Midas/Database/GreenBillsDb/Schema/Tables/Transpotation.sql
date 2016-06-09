CREATE TABLE [dbo].[Transpotation]
(
	[TranspotationId] INT identity(1,1) NOT NULL PRIMARY KEY,
	[Name] nvarchar(100) not null,	
	[AddressId] bigint,
	[ContactInfoId] bigint,
	[AccountId] bigint not null,
    CONSTRAINT [FK_Transpotation_AddressId] FOREIGN KEY (AddressId) REFERENCES Address(AddressId), 
    CONSTRAINT [FK_Transpotation_ContactId] FOREIGN KEY ([ContactInfoId]) REFERENCES [ContactInfo](ContactInfoId),
	CONSTRAINT [FK_Transpotation_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId)
	)
