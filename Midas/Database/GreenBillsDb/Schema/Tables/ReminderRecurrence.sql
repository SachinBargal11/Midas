CREATE TABLE [dbo].[ReminderRecurrence]
(
	[RecurrenceId] [int] IDENTITY(1,1) NOT NULL,
	[ReminderId] [int] NOT NULL,
	[ReminderDate] [datetime] NOT NULL,
	[RecurrenceType] [int] NULL,
	[DismissStatus] bit NULL
)
