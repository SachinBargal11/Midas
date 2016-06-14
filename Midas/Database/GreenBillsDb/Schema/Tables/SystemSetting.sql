CREATE TABLE [dbo].[SystemSetting]
(
	[SystemSettingId] bigint identity(1,1) NOT NULL PRIMARY KEY,
	[SystemSettingKeyId] bigint,
	[Value] nvarchar(50),
	[AccountId] bigint,
	[SubValue] nvarchar(50)

	CONSTRAINT [FK_SystemSetting_ContactId] FOREIGN KEY ([SystemSettingKeyId]) REFERENCES [SystemSettingKey](SystemSettingKeyId),
	CONSTRAINT [FK_SystemSetting_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId ),
)
