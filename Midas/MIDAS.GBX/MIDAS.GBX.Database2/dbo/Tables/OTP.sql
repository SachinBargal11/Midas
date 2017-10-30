CREATE TABLE [dbo].[OTP] (
    [id]             INT           IDENTITY (1, 1) NOT NULL,
    [UserID]         INT           NOT NULL,
    [Pin]            INT           NOT NULL,
    [OTP]            INT           NOT NULL,
    [IsDeleted]      BIT           CONSTRAINT [DF_OTP_IsDeleted] DEFAULT ((0)) NULL,
    [CreateByUserID] INT           NOT NULL,
    [CreateDate]     DATETIME2 (7) NOT NULL,
    [UpdateByUserID] INT           NULL,
    [UpdateDate]     DATETIME2 (7) NULL,
    CONSTRAINT [PK_OTP] PRIMARY KEY CLUSTERED ([id] ASC)
);

