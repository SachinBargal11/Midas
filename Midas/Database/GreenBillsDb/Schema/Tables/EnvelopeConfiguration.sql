create table [dbo].[EnvelopeConfiguration](
	[EnvelopeConfigurationId] [int] identity(1,1),
	[AccountId] [int],
	[OfficeId] [int],
	[IsCompanyName] [bit] ,
	[IsAddressStreet1] [bit],
	[IsAddressStreet2] [bit],
	[IsAddressCity] [bit],
	[IsAddressZip] [bit],
	[IsAddressState] [bit] ,
	[EnvelopeDisplayName] [nvarchar](800),
	CreatedDate DateTime,
	UpdatedDate DateTime,
	CreatedBy int,
	UpdatedBy int,
	Deleted bit	
) 
