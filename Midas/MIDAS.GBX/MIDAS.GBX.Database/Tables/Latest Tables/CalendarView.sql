CREATE TABLE [dbo].[CalendarView]
(
    [Id] [TINYINT] NOT NULL IDENTITY, 
    [CalendarViewText] NVARCHAR(50) NOT NULL,
    [IsDeleted] [bit] NULL  CONSTRAINT [DF_CalendarView_IsDeleted] DEFAULT 0,
    [CreateByUserID] [int] NOT NULL,
    [CreateDate] [datetime2](7) NOT NULL,
    [UpdateByUserID] [int] NULL,
    [UpdateDate] [datetime2](7) NULL, 
    CONSTRAINT [PK_CalendarView] PRIMARY KEY ([Id])
)
GO

/*
INSERT INTO [dbo].[CalendarView] ([CalendarViewText], [IsDeleted], [CreateByUserID], [CreateDate])
	VALUES ('Month', 0, 1, GETDATE()), ('Week', 0, 1, GETDATE()), ('Day', 0, 1, GETDATE())
*/
