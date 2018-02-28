CREATE TABLE [dbo].[CalendarEvent] (
    [Id]                  INT             IDENTITY (1, 1) NOT NULL,
    [Name]                NVARCHAR (50)   NULL,
    [EventStart]          DATETIME2 (7)   NOT NULL,
    [EventEnd]            DATETIME2 (7)   NOT NULL,
    [TimeZone]            NVARCHAR (50)   NULL,
    [Description]         NVARCHAR (250)  NULL,
    [RecurrenceId]        INT             NULL,
    [RecurrenceRule]      NVARCHAR (500)  NULL,
    [RecurrenceException] NVARCHAR (1000) NULL,
    [IsAllDay]            BIT             CONSTRAINT [DF_CalendarEvent_IsAllDay] DEFAULT 0 NULL,
    [IsCancelled]         BIT             CONSTRAINT [DF_CalendarEvent_IsCancelled] DEFAULT 0 NULL,
    [IsDeleted]           BIT             CONSTRAINT [DF_CalendarEvent_IsDeleted] DEFAULT 0 NULL,    
    [CreateByUserID]      INT             NOT NULL,
    [CreateDate]          DATETIME2 (7)   NOT NULL,
    [UpdateByUserID]      INT             NULL,
    [UpdateDate]          DATETIME2 (7)   NULL,
    CONSTRAINT [PK_CalendarEvent] PRIMARY KEY CLUSTERED ([Id] ASC)
);

