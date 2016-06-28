CREATE TABLE [dbo].[DoctorDetails]
(    
	[DoctorDetailId] int NOT NULL PRIMARY KEY,
	[DoctorUserId] int,
	[LicenseNumber] nvarchar(50),
	[WCBAuthorization] nvarchar(50),
	[WcbRatingCode] nvarchar(50),
	[NPI] nvarchar(50),
	[FederalTaxId] nvarchar(50),
	[TaxType] TINYINT,
	[Koel] money,
	[AssignNumber] nvarchar(50) ,
	[Title] nvarchar(10),
	EIN_SIN INT,
	[IsEmployee] bit,
	[Type] int,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int
	
)
