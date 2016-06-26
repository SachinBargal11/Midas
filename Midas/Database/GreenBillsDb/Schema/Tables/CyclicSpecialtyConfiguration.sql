create table [dbo].[CyclicSpecialtyConfiguration](
	[csc] int identity(1,1),
	[cic] int,
	[AccountId] int,
	[SpecialtyId] nvarchar(20),
	[StartDate] datetime,
	[LogicCode] nvarchar(10),
	[CreatedDate] datetime, 
    [UpdatedDate]datetime,
	[CreatedBy] int,
    [UpdatedBy]int,
     [Deleted] bit

) 