CREATE TABLE [dbo].[UserCompanyRole] (
    [id]             INT           IDENTITY (1, 1) NOT NULL,
    [UserID]         INT           NOT NULL,
    [RoleID]         INT           NOT NULL,
    [IsDeleted]      BIT           CONSTRAINT [DF_UserCompanyRole_IsDeleted] DEFAULT ((0)) NULL,
    [CreateByUserID] INT           NOT NULL,
    [CreateDate]     DATETIME2 (7) NOT NULL,
    [UpdateByUserID] INT           NULL,
    [UpdateDate]     DATETIME2 (7) NULL,
    CONSTRAINT [PK_UserCompanyRole] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_UserCompanyRole_User] FOREIGN KEY ([UserID]) REFERENCES [dbo].[User] ([id])
);

