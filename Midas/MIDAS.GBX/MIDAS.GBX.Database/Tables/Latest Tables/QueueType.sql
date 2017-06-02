CREATE TABLE [Messaging].[QueueType]
(
    [Id] INT NOT NULL IDENTITY,
    [QueueTypeName] NVARCHAR(150) NOT NULL, 
    CONSTRAINT [PK_QueueType] PRIMARY KEY ([Id])
)
GO

INSERT INTO [Messaging].[QueueType] ([QueueTypeName]) VALUES ('SQL TABLE'), ('MSMQ'), ('Azure Queue'), ('Service Bus')

