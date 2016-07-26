CREATE TABLE [dbo].[ReminderStatus]
(
	[ReminderStatusId] int,
	[ReminderStatusDesc] nvarchar(50),
	CreatedDate DateTime,
	UpdatedDate DateTime,
	CreatedBy int,
	UpdatedBy int,
	Deleted bit
)
