CREATE TABLE [dbo].[SystemSettingKey]
(
	[SystemSettingKeyId] int identity(1,1) NOT NULL PRIMARY KEY,
	[Key] nvarchar(200),
	[SubValue] bit,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int
)
