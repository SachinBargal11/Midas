CREATE TABLE [dbo].[Invitation] (
    [InvitationID]   INT              IDENTITY (1, 1) NOT NULL,
    [CompanyID]      INT              NOT NULL,
    [UserID]         INT              NOT NULL,
    [UniqueID]       UNIQUEIDENTIFIER NOT NULL,
    [IsExpired]      BIT              NULL,
    [IsActivated]    BIT              NOT NULL,
    [IsDeleted]      BIT              CONSTRAINT [DF_Invitation_IsDeleted] DEFAULT ((0)) NULL,
    [CreateByUserID] INT              NOT NULL,
    [CreateDate]     DATETIME2 (7)    NOT NULL,
    [UpdateByUserID] INT              NULL,
    [UpdateDate]     DATETIME2 (7)    NULL,
    CONSTRAINT [PK_Invitation] PRIMARY KEY CLUSTERED ([InvitationID] ASC),
    CONSTRAINT [FK_Invitation_Company] FOREIGN KEY ([CompanyID]) REFERENCES [dbo].[Company] ([id]),
    CONSTRAINT [FK_Invitation_User_Invitation] FOREIGN KEY ([UserID]) REFERENCES [dbo].[User] ([id])
);

