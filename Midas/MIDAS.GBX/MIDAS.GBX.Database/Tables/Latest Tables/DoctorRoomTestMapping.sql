﻿IF NOT EXISTS
(
	SELECT	1 
	FROM	INFORMATION_SCHEMA.TABLES
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'DoctorRoomTestMapping'
)
BEGIN
    CREATE TABLE [dbo].[DoctorRoomTestMapping]
    (
        [Id] INT NOT NULL IDENTITY, 
        [DoctorId] INT NOT NULL, 
        [RoomTestId] INT NOT NULL,

        [IsDeleted] [bit] NULL CONSTRAINT [DF_DoctorRoomTestMapping_IsDeleted] DEFAULT 0,
	    [CreateByUserID] [int] NOT NULL,
	    [CreateDate] [datetime2](7) NOT NULL,
	    [UpdateByUserID] [int] NULL,
	    [UpdateDate] [datetime2](7) NULL, 
        CONSTRAINT [PK_DoctorRoomTestMapping] PRIMARY KEY ([Id])
    )
END
ELSE
BEGIN
	PRINT 'Table [dbo].[DoctorRoomTestMapping] already exists in database: ' + DB_NAME()
END
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'DoctorRoomTestMapping'
	AND		CONSTRAINT_NAME = 'FK_DoctorRoomTestMapping_Doctor_DoctorId'
)
BEGIN
	ALTER TABLE [dbo].[DoctorRoomTestMapping] 
        DROP CONSTRAINT [FK_DoctorRoomTestMapping_Doctor_DoctorId]
END

ALTER TABLE [dbo].[DoctorRoomTestMapping]  WITH CHECK ADD  CONSTRAINT [FK_DoctorRoomTestMapping_Doctor_DoctorId] FOREIGN KEY([DoctorId])
	REFERENCES [dbo].[Doctor] ([Id])
GO

IF EXISTS
(
	SELECT	1
	FROM	INFORMATION_SCHEMA.TABLE_CONSTRAINTS
	WHERE	TABLE_SCHEMA = 'dbo'
	AND		TABLE_NAME = 'DoctorRoomTestMapping'
	AND		CONSTRAINT_NAME = 'FK_DoctorRoomTestMapping_RoomTest_RoomTestId'
)
BEGIN
	ALTER TABLE [dbo].[DoctorRoomTestMapping] 
        DROP CONSTRAINT [FK_DoctorRoomTestMapping_RoomTest_RoomTestId]
END

ALTER TABLE [dbo].[DoctorRoomTestMapping]  WITH CHECK ADD  CONSTRAINT [FK_DoctorRoomTestMapping_RoomTest_RoomTestId] FOREIGN KEY([RoomTestId])
	REFERENCES [dbo].[RoomTest] ([Id])
GO