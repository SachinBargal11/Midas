CREATE TABLE [dbo].[AuditTrail](
       [AuditId] [INT] IDENTITY(1,1) NOT NULL,
       [DateTime] [DATETIME] NOT NULL,
       [TableName] [NVARCHAR](255) NOT NULL,
       [AuditEntry] [VARCHAR](2000) NULL
)
