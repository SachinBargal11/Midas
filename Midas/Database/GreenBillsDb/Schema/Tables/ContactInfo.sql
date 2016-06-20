CREATE TABLE [dbo].[ContactInfo]
(
	[ContactInfoId] int NOT NULL PRIMARY KEY IDENTITY(1,1),
	[Name]	NVARCHAR(50) NOT NULL Default(''),
	[CellPhone] NVARCHAR(50) NULL,
	[EmailAddress] NVARCHAR(256) NULL,
	[HomePhone] NVARCHAR(50) NULL,
	[WorkPhone] NVARCHAR(50) NULL,
	[FaxNo] NVARCHAR(50) NULL,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int
)
