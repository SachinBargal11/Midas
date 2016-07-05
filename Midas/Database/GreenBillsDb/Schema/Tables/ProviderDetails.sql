CREATE TABLE [dbo].[ProviderDetails]
(	[ProviderDetailId] int identity(1,1) NOT NULL PRIMARY KEY,
	[ProviderUserID] int,
	[NPI] nvarchar(50),
	[FederalTaxId] nvarchar(50),
	[Prefix] nvarchar(5),
	[LocationId] int,
	[PlaceOfService] int,
	[AccountId] int not null,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedByUserID] int,
	[UpdatedBYUserID]  int
  )
