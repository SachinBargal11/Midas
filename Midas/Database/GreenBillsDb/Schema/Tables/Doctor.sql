CREATE TABLE [dbo].[DoctorDetails]
(    
	[DoctorDetailId] int NOT NULL PRIMARY KEY,
	[DoctorUserId] int,
	[LicenseNumber] nvarchar(50),
	[WCBAuthorization] nvarchar(50),
	[WcbRatingCode] nvarchar(50),
	[NPI] nvarchar(50),
	[ProviderId] int,
	[FederalTaxId] nvarchar(50),
	[TaxType] TINYINT,
	[AccountId] int not null,
	[Koel] money,
	[AssignNumber] nvarchar(50),
	[Title] nvarchar(10),
	[IsEmployee] bit,
	[IsReferral] bit,
	[IsUnBilled] bit,
    [IsSupervising] bit,
	[Type] int,
	[SpecialtyId] int,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int
	
)
