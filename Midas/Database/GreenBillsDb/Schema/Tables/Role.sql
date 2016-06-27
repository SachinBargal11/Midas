CREATE TABLE [dbo].[Role]
(
[RoleID] int identity(1,1),
[RoleName] varchar(50),
[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int,
IPAddress varchar(15)
)
