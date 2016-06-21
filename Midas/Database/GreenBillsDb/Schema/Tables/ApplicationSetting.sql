CREATE TABLE [dbo].[ApplicationSetting]
(
	[CommanSettingId] INT identity(1,1)NOT NULL PRIMARY KEY,
	[Name] nvarchar(100),
	[Value] nvarchar(1000),
	[Description] nvarchar(200),
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int,
	IPAddress varchar(15)

)
