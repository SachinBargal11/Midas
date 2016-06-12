CREATE TABLE [dbo].[Insurance]
(
	[InsuranceId] bigint identity(1,1) NOT NULL PRIMARY KEY,
	[Name] nvarchar(250),
	[Code] nvarchar(20),
	[ContactInfoId] bigint,
	[ContactPerson] nvarchar(20),
	[Priority_Billing] bit,
	[Paper_Authorization] bit,
	[Generate1500Forms] bit,
	[AccountId] bigint
	 CONSTRAINT [FK_Insurance_ContactId] FOREIGN KEY ([ContactInfoId]) REFERENCES [ContactInfo](ContactInfoId),
	 CONSTRAINT [FK_Insurance_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId)
)
