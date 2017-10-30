CREATE TABLE [dbo].[Log] (
    [id]             INT            IDENTITY (1, 1) NOT NULL,
    [RequestID]      NVARCHAR (200) NOT NULL,
    [ResponseID]     NVARCHAR (200) NOT NULL,
    [IpAddress]      NVARCHAR (15)  NOT NULL,
    [Country]        NVARCHAR (50)  NOT NULL,
    [MachineName]    NVARCHAR (50)  NOT NULL,
    [UserID]         INT            NOT NULL,
    [RequestURL]     NVARCHAR (200) NOT NULL,
    [IsDeleted]      BIT            CONSTRAINT [DF_Log_IsDeleted] DEFAULT ((0)) NULL,
    [CreateByUserID] INT            NOT NULL,
    [CreateDate]     DATETIME2 (7)  NOT NULL,
    [UpdateByUserID] INT            NULL,
    [UpdateDate]     DATETIME2 (7)  NULL,
    CONSTRAINT [PK_Log] PRIMARY KEY CLUSTERED ([id] ASC)
);

