CREATE TABLE [dbo].[Notes]
(
NotesId int identity(1,1),
NoteTypeId int,
CaseId int,
NotesDescription nvarchar(max),
[Deleted] bit,
[CreatedDate] datetime,
[UpdatedDate] datetime,
[CreatedBy] int,
[UpdatedBY]  int
)
