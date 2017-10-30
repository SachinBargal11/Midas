CREATE TABLE [dbo].[Room] (
    [id]                INT           IDENTITY (1, 1) NOT NULL,
    [Name]              NVARCHAR (50) NOT NULL,
    [ContactPersonName] NVARCHAR (50) NOT NULL,
    [Phone]             NVARCHAR (20) NOT NULL,
    [ScheduleID]        INT           NULL,
    [LocationID]        INT           NOT NULL,
    [RoomTestID]        INT           NOT NULL,
    [IsDeleted]         BIT           NULL,
    [CreateByUserID]    INT           NOT NULL,
    [CreateDate]        DATETIME2 (7) NOT NULL,
    [UpdateByUserID]    INT           NULL,
    [UpdateDate]        DATETIME2 (7) NULL,
    CONSTRAINT [PK_Room] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_Room_Location] FOREIGN KEY ([LocationID]) REFERENCES [dbo].[Location] ([id]),
    CONSTRAINT [FK_Room_RoomTest] FOREIGN KEY ([RoomTestID]) REFERENCES [dbo].[RoomTest] ([id]),
    CONSTRAINT [FK_Room_Schedule] FOREIGN KEY ([ScheduleID]) REFERENCES [dbo].[Schedule] ([id])
);

