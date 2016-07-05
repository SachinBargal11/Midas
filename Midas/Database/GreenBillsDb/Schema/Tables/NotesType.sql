CREATE TABLE [dbo].[NotesType]
(
	NoteTypeId int identity(1,1),
    NoteType nvarchar(50),
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int
)
