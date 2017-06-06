CREATE TABLE [Messaging].[SMSQueue]
(
    [Id] INT NOT NULL IDENTITY,
    [AppId] INT NOT NULL,
    --[AccountSid] NVARCHAR(150) NULL, 
    --[AuthToken] NVARCHAR(150) NULL, 
    [ToNumber] NVARCHAR(50) NOT NULL, 
    [FromNumber] NVARCHAR(50) NOT NULL, 
    [Message] NVARCHAR(150) NOT NULL, 
    [CreatedDate] DATETIME2 NOT NULL, 
    [DeliveryDate] DATETIME2 NULL, 
    [NumberOfAttempts] INT NOT NULL DEFAULT 0, 
    [ResultObject] NVARCHAR(4000) NULL,
    CONSTRAINT [PK_SMSQueue] PRIMARY KEY ([Id])
)
GO
