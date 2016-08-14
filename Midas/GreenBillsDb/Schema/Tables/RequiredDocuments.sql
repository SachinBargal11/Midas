CREATE TABLE [dbo].[RequiredDocuments]
(
	[RequiredDocumentId] INT NOT NULL PRIMARY KEY,
	[CaseDocumentId] int,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int,
	IPAddress varchar(15)
)
