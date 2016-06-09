CREATE TABLE [dbo].[Employer]
(
	[EmployerId] bigint identity(1,1) NOT NULL PRIMARY KEY,
	[Name] nvarchar(250),
	[Code] nvarchar(20),
	[ContactInfoId] bigint,
	
	[AccountId] bigint
	 CONSTRAINT [FK_Employer_ContactId] FOREIGN KEY ([ContactInfoId]) REFERENCES [ContactInfo](ContactInfoId),
	 CONSTRAINT [FK_Employer_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId)
)
