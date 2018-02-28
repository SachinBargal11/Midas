CREATE TABLE [dbo].[DoctorRoomTestMapping] (
    [Id]             INT           IDENTITY (1, 1) NOT NULL,
    [DoctorId]       INT           NOT NULL,
    [RoomTestId]     INT           NOT NULL,
    [IsDeleted]      BIT           CONSTRAINT [DF_DoctorRoomTestMapping_IsDeleted] DEFAULT ((0)) NULL,
    [CreateByUserID] INT           NOT NULL,
    [CreateDate]     DATETIME2 (7) NOT NULL,
    [UpdateByUserID] INT           NULL,
    [UpdateDate]     DATETIME2 (7) NULL,
    CONSTRAINT [PK_DoctorRoomTestMapping] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_DoctorRoomTestMapping_Doctor_DoctorId] FOREIGN KEY ([DoctorId]) REFERENCES [dbo].[Doctor] ([Id]),
    CONSTRAINT [FK_DoctorRoomTestMapping_RoomTest_RoomTestId] FOREIGN KEY ([RoomTestId]) REFERENCES [dbo].[RoomTest] ([id])
);

