CREATE TABLE [dbo].[ScheduleDetail] (
    [id]             INT           IDENTITY (1, 1) NOT NULL,
    [Name]           NVARCHAR (50) NOT NULL,
    [ScheduleID]     INT           NOT NULL,
    [DayOfWeek]      INT           NOT NULL,
    [SlotStart]      TIME (7)      NOT NULL,
    [SlotEnd]        TIME (7)      NOT NULL,
    [SlotDate]       DATETIME2 (7) NULL,
    [Status]         TINYINT       NOT NULL,
    [IsDeleted]      BIT           CONSTRAINT [DF_ScheduleDetail_IsDeleted] DEFAULT ((0)) NULL,
    [CreateByUserID] INT           NOT NULL,
    [CreateDate]     DATETIME2 (7) NOT NULL,
    [UpdateByUserID] INT           NULL,
    [UpdateDate]     DATETIME2 (7) NULL,
    CONSTRAINT [PK_ScheduleDetail] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_ScheduleDetail_Schedule] FOREIGN KEY ([ScheduleID]) REFERENCES [dbo].[Schedule] ([id])
);

