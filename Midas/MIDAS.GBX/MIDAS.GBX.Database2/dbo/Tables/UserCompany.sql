CREATE TABLE [dbo].[UserCompany] (
    [id]             INT           IDENTITY (1, 1) NOT NULL,
    [UserID]         INT           NOT NULL,
    [CompanyID]      INT           NOT NULL,
    [IsDeleted]      BIT           CONSTRAINT [DF_UserCompany_IsDeleted] DEFAULT ((0)) NULL,
    [CreateByUserID] INT           NOT NULL,
    [CreateDate]     DATETIME2 (7) NOT NULL,
    [UpdateByUserID] INT           NULL,
    [UpdateDate]     DATETIME2 (7) NULL,
    [IsAccepted]     BIT           DEFAULT ((1)) NOT NULL,
    [UserStatusID]   INT           DEFAULT ((1)) NOT NULL,
    CONSTRAINT [PK_UserCompany] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_UserCompany_Company] FOREIGN KEY ([CompanyID]) REFERENCES [dbo].[Company] ([id]),
    CONSTRAINT [FK_UserCompany_User] FOREIGN KEY ([UserID]) REFERENCES [dbo].[User] ([id])
);

