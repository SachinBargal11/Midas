CREATE TABLE [dbo].[RoomTest] (
    [id]             INT           IDENTITY (1, 1) NOT NULL,
    [Name]           NVARCHAR (50) NOT NULL,
    [IsDeleted]      BIT           CONSTRAINT [DF_RoomTest_IsDeleted] DEFAULT ((0)) NULL,
    [CreateByUserID] INT           NOT NULL,
    [CreateDate]     DATETIME2 (7) NOT NULL,
    [UpdateByUserID] INT           NULL,
    [UpdateDate]     DATETIME2 (7) NULL,
    [ColorCode]      NVARCHAR (20) NULL,
    CONSTRAINT [PK_RoomTest] PRIMARY KEY CLUSTERED ([id] ASC)
);

