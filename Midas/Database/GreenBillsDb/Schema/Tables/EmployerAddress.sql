CREATE TABLE [dbo].[EmployerAddress]
(
	[EmployerAddressId] BIGINT NOT NULL PRIMARY KEY,
	[EmployerId] bigint ,
	[AccountId] bigint,
	[AddressId] bigint,
	[Default] bit,
	CONSTRAINT [FK_EmployerAddress_AddressId] FOREIGN KEY (AddressId) REFERENCES Address(AddressId), 
    CONSTRAINT [FK_EmployerAddress_InsuranceId] FOREIGN KEY ([EmployerId]) REFERENCES [Employer](EmployerId),
	CONSTRAINT [FK_EmployerAddress_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId)
)
