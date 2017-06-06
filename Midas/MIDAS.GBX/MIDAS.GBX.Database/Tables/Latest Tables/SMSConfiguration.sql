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

ALTER TABLE [Messaging].[SMSConfiguration]  WITH CHECK ADD  CONSTRAINT [FK_SMSConfiguration_QueueType_QueueTypeId] FOREIGN KEY([QueueTypeId])
	REFERENCES [Messaging].[QueueType] ([Id])
GO

ALTER TABLE [Messaging].[SMSConfiguration] CHECK CONSTRAINT [FK_SMSConfiguration_QueueType_QueueTypeId]
GO
