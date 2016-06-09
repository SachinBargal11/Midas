CREATE TABLE [dbo].[InsuranceAddress]
(
	[InsuranceAddressId] BIGINT NOT NULL PRIMARY KEY,
	[InsuranceId] bigint ,
	[AccountId] bigint,
	[AddressId] bigint,
	[Default] bit,
	CONSTRAINT [FK_InsuranceAddress_AddressId] FOREIGN KEY (AddressId) REFERENCES Address(AddressId), 
    CONSTRAINT [FK_InsuranceAddress_InsuranceId] FOREIGN KEY ([InsuranceId]) REFERENCES [Insurance](InsuranceId),
	CONSTRAINT [FK_InsuranceAddress_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId)
)
