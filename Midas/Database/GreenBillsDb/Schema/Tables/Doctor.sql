CREATE TABLE [dbo].[Doctor]
(
	[DoctorId] BIGINT NOT NULL PRIMARY KEY,
	[Name] nvarchar(100) not null,
	[LicenseNumber] nvarchar(50),
	[WCBAuthorization] nvarchar(50),
	[WcbRatingCode] nvarchar(50),
	[NPI] nvarchar(50),
	[ProviderId] bigint,
	[FederalTaxId] nvarchar(50),
	[TaxType] int,
	[AccountId] bigint not null,
	[Koel] money,
	[AssignNumber] nvarchar(50),
	[Title] nvarchar(10),
	[IsEmployee] bit,
	[IsReferral] bit,
	[IsUnBilled] bit,
    [IsSupervising] bit,
	[IsReading] bit,
	[IsReffering] bit,
	[IsBilling] bit,
	[SpecialtyId] bigint
	CONSTRAINT [FK_Doctor_SpecialtyId] FOREIGN KEY ([SpecialtyId]) REFERENCES [Specialty](SpecialtyId),
	CONSTRAINT [FK_Doctor_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId),
	CONSTRAINT [FK_Doctor_ProviderId] FOREIGN KEY ([ProviderId]) REFERENCES [Provider](ProviderId)
)
