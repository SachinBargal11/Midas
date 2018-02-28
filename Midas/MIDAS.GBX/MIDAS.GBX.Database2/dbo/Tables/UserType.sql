CREATE TABLE [dbo].[UserType] (
    [id]             TINYINT       IDENTITY (1, 1) NOT NULL,
    [Name]           NVARCHAR (50) NOT NULL,
    [IsDeleted]      BIT           NULL,
    [CreateByUserID] INT           NOT NULL,
    [CreateDate]     DATETIME2 (7) NOT NULL,
    [UpdateByUserID] INT           NULL,
    [UpdateDate]     DATETIME2 (7) NULL,
    CONSTRAINT [PK_UserType] PRIMARY KEY CLUSTERED ([id] ASC)
);

