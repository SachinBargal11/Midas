CREATE TABLE [dbo].[Address]
(
	[AddressId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[Name]	NVARCHAR(50) NOT NULL Default(''),
	[Address1] NVARCHAR(512) NOT NULL,
	[Address2] NVARCHAR(512) NULL,
	[City] NVARCHAR(256) NOT NULL,
	[State] NVARCHAR(256) NOT NULL,
	[ZipCode] NVARCHAR(12) NULL,
	[CountryCode] NVARCHAR(3) NULL, 
    [AccountId] INT NOT NULL, 
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int
    CONSTRAINT [FK_Address_Account_id] FOREIGN KEY ([AccountId]) REFERENCES [Account]([AccountId]),
)
