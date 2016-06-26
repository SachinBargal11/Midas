create table [dbo].[ReminderType](
	[ReminderTypeId] [int] identity(1,1) ,
	[ReminderType] [nvarchar](max) ,
	[AccountId] [int],
	[OfficeId] [int],	
	CreatedDate DateTime,
	UpdatedDate DateTime,
	CreatedBy int,
	UpdatedBy int,
	Deleted bit
)