CREATE TABLE [dbo].[SMSConfiguration]
(
    [AppId] INT NOT NULL PRIMARY KEY, 
    [QueueTypeId] INT NOT NULL, 
    [AccountSid] NVARCHAR(150) NOT NULL, 
    [AuthToken] NVARCHAR(150) NOT NULL, 
    [IsDeleted] BIT NOT NULL DEFAULT 0
)
GO

