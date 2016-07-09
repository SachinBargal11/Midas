CREATE TABLE [dbo].[MedicalOffices]
(
	[MedicalOfficeId] INT identity(1,1) NOT NULL PRIMARY KEY,
	[Name] nvarchar(100),
	[AddressId] int ,
	[ContactInfoId] int ,	
	[Prefix] nvarchar(2),
	[LastLogin] datetime,
	[IsReferring] bit, -- Treating or Referring
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedByUserID] int,
	[UpdatedBY]  int
)
