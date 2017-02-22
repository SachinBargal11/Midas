CREATE TABLE [dbo].[CalendarAppointment]
(
	[Id] [INT] NOT NULL IDENTITY,
	[SeriesId] UNIQUEIDENTIFIER NOT NULL,
	[Title] NVARCHAR(50) NOT NULL,
	[Note] NVARCHAR(250) NULL, 
    [Description] NVARCHAR(500) NULL, 
    
    [StartDate] DATETIME2 NOT NULL, 
    [EndDate] DATETIME2 NOT NULL, 
    [EventDate] DATETIME2 NOT NULL, 
    [StartTime] DATETIME2 NOT NULL, 
    [EndTime] DATETIME2 NOT NULL, 
    [EventTime] DATETIME2 NOT NULL, 
    [EventDayMonday] BIT NULL DEFAULT 0, 
    [EventDayTuesday] BIT NULL DEFAULT 0, 
    [EventDayWednesday] BIT NULL DEFAULT 0, 
    [EventDayThursday] BIT NULL DEFAULT 0, 
    [EventDayFriday] BIT NULL DEFAULT 0, 
    [EventDaySaturday] BIT NULL DEFAULT 0, 
    [EventDaySunday] BIT NULL DEFAULT 0, 
    [RepeatWeekly] BIT NULL DEFAULT 0, 
    [RepeatMonthly] BIT NULL DEFAULT 0, 
    CONSTRAINT [PK_CalendarAppointment] PRIMARY KEY ([Id])
)
