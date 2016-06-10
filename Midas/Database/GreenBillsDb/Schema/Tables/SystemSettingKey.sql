CREATE TABLE [dbo].[SystemSettingKey]
(
	[SystemSettingKeyId] bigint identity(1,1) NOT NULL PRIMARY KEY,
	[Key] nvarchar(200),
	[SubValue] bit

)
