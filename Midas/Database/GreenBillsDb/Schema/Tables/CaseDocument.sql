CREATE TABLE [dbo].[CaseDocument]
(
	[CaseDocumentId] bigint identity(1,1) NOT NULL PRIMARY KEY, 
    [CaseId] bigint, 
    [CaseTypeId] bigint,
)
