create table [dbo].[CyclicInsuranceConfiguration](
	[cic] [int] identity(1,1),
	[InsuranceId] int,	
	[AccountId] int,
    [OfficeId] int,		
    [CreatedDate] datetime,
    [UpdatedDate]datetime,
	[CreatedBy] int,
        [UpdatedBy]int,
        [Deleted] bit
)
