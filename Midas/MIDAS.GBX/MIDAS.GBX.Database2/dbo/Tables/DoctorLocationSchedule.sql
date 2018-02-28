CREATE TABLE [dbo].[DoctorLocationSchedule] (
    [id]             INT           IDENTITY (1, 1) NOT NULL,
    [DoctorID]       INT           NOT NULL,
    [LocationID]     INT           NOT NULL,
    [ScheduleID]     INT           NOT NULL,
    [IsDeleted]      BIT           NULL,
    [CreateByUserID] INT           NOT NULL,
    [CreateDate]     DATETIME2 (7) NOT NULL,
    [UpdateByUserID] INT           NULL,
    [UpdateDate]     DATETIME2 (7) NULL,
    CONSTRAINT [PK_DoctorLocationSchedule] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_DoctorLocationSchedule_Doctor] FOREIGN KEY ([DoctorID]) REFERENCES [dbo].[Doctor] ([Id]),
    CONSTRAINT [FK_DoctorLocationSchedule_Location] FOREIGN KEY ([LocationID]) REFERENCES [dbo].[Location] ([id]),
    CONSTRAINT [FK_DoctorLocationSchedule_Schedule] FOREIGN KEY ([ScheduleID]) REFERENCES [dbo].[Schedule] ([id])
);

