CREATE TABLE [dbo].[CalendarEvent]
(
	[Id] [INT] NOT NULL IDENTITY,  --4, 5
	[Name] [NVARCHAR](50) NULL, 
    [EventStart] [DATETIME2] NOT NULL, 
    [EventEnd] [DATETIME2] NOT NULL, 
    [TimeZone] [NVARCHAR](50) NULL, 
    [Description] [NVARCHAR](250) NULL, 
    [RecurrenceId] [INT] NULL, --second 4
    [RecurrenceRule] [NVARCHAR](500) NULL, 
    [RecurrenceException] [NVARCHAR](1000) NULL, --wed
    [IsAllDay] [BIT] NULL DEFAULT 0, 
	[IsCancelled] [bit] NULL DEFAULT 0,

	[IsDeleted] [bit] NULL DEFAULT 0,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL, 
    CONSTRAINT [PK_CalendarEvent] PRIMARY KEY ([Id])
)
GO

--ALTER TABLE [dbo].[CalendarEvent] ADD [IsCancelled] [bit] NULL DEFAULT 0
--GO
