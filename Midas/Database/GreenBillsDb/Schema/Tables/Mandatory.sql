create table [dbo].[Mandatory](
	[MandatoryId] [int] identity(1,1),
	[Page] [nvarchar](100),
	[MandatoryColumn] [nvarchar](200),
	[AccountId] [int],
	[OfficeId] [int],
	[ControlName] [nvarchar](100),
	CreatedDate DateTime,
	UpdatedDate DateTime,
	CreatedBy int,
	UpdatedBy int,
	Deleted bit
) 
