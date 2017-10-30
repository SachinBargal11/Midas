CREATE TABLE [dbo].[PasswordToken] (
    [id]             INT              IDENTITY (1, 1) NOT NULL,
    [UserName]       NVARCHAR (200)   NOT NULL,
    [TokenHash]      UNIQUEIDENTIFIER NOT NULL,
    [IsTokenUsed]    BIT              NOT NULL,
    [IsDeleted]      BIT              CONSTRAINT [DF_PasswordToken_IsDeleted] DEFAULT ((0)) NOT NULL,
    [CreateByUserID] INT              NOT NULL,
    [CreateDate]     DATETIME2 (7)    NOT NULL,
    [UpdateByUserID] INT              NULL,
    [UpdateDate]     DATETIME2 (7)    NULL,
    CONSTRAINT [PK_PasswordToken] PRIMARY KEY CLUSTERED ([id] ASC)
);

