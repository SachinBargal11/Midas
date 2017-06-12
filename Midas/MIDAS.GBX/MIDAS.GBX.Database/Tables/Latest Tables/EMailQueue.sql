CREATE TABLE [Messaging].[EMailQueue]
(
    [Id] INT NOT NULL IDENTITY,
    [AppId] INT NOT NULL,
    [FromEmail] NVARCHAR(50) NOT NULL, 
    [ToEmail] NVARCHAR(500) NOT NULL,
    [CCEmail] NVARCHAR(500) NULL,
    [BCCEmail] NVARCHAR(500) NULL,
    [EMailSubject] NVARCHAR(500) NOT NULL, 
    [EMailBody] NVARCHAR(4000) NOT NULL, 
    [CreatedDate] DATETIME2 NOT NULL, 
    [DeliveryDate] DATETIME2 NULL, 
    [NumberOfAttempts] INT NOT NULL DEFAULT 0, 
    [ResultObject] NVARCHAR(4000) NULL,
    CONSTRAINT [PK_EMailQueue] PRIMARY KEY ([Id])
)
