CREATE TABLE [dbo].[GeneralDenials]
(
	GeneralDenialsId int identity(1,1),
	CaseId int,
	DenialId int,
	Comment nvarchar(max),
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int
)
