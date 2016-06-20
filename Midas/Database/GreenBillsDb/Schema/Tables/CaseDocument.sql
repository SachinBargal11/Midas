CREATE TABLE [dbo].[CaseDocument]
(
	[CaseDocumentId] bigint identity(1,1) NOT NULL PRIMARY KEY, 
    [CaseId] bigint, 
    [CaseTypeId] bigint,
	[IsRecieved]bit, 
    [AssignTo] NCHAR(10) NULL, 
    [AssignOn] DATETIME NULL, 
    [Status] NCHAR(20) NULL, 
    [DocumentTypeId] NCHAR(10) NULL, 
    [NodeId] INT NULL,
)
