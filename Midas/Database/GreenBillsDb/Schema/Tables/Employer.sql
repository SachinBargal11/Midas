CREATE TABLE [dbo].[Employer]
(
	[EmployerId] int identity(1,1) NOT NULL PRIMARY KEY,
	[Name] nvarchar(250) NOT NULL,
	[Code] nvarchar(20),
	[ContactInfoId] int,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int,
	[AccountId] int
	 CONSTRAINT [FK_Employer_ContactId] FOREIGN KEY ([ContactInfoId]) REFERENCES [ContactInfo](ContactInfoId),
	 CONSTRAINT [FK_Employer_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId)
)
