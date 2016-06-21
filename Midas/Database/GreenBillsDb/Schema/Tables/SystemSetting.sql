create TABLE [dbo].[SystemSetting]
(
	[SystemSettingId] int identity(1,1) NOT NULL PRIMARY KEY,
	[SystemSettingKeyId] int,
	[SysValue] nvarchar(50),
	[AccountId] bigint,
	[SubValue] nvarchar(50),
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int

	
)

