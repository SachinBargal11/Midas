CREATE TABLE [dbo].[CalendarView] (
    [Id]               TINYINT       IDENTITY (1, 1) NOT NULL,
    [CalendarViewText] NVARCHAR (128) NOT NULL,
    [IsDeleted]        BIT           CONSTRAINT [DF_CalendarView_IsDeleted] DEFAULT 0 NULL,
    [CreateByUserID]   INT           NOT NULL,
    [CreateDate]       DATETIME2 (7) NOT NULL,
    [UpdateByUserID]   INT           NULL,
    [UpdateDate]       DATETIME2 (7) NULL,
    CONSTRAINT [PK_CalendarView] PRIMARY KEY CLUSTERED ([Id] ASC)
);

