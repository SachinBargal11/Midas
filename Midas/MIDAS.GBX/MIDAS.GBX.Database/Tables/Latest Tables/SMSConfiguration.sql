CREATE TABLE [Messaging].[SMSConfiguration]
(
    [Id] INT NOT NULL IDENTITY,
    [AppId] INT NOT NULL, 
    [QueueTypeId] INT NOT NULL, 
    [AccountSid] NVARCHAR(150) NOT NULL, 
    [AuthToken] NVARCHAR(150) NOT NULL, 
    [IsDeleted] BIT NOT NULL DEFAULT 0,
    CONSTRAINT [PK_SMSConfiguration] PRIMARY KEY ([Id])
)
GO
