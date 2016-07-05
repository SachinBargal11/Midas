CREATE TABLE [dbo].[TransferredCases]
(
	[TransferredCasesId] INT NOT NULL PRIMARY KEY,
	[MedicalOfficeId] int,
	[LawFirmOfficdeId] int,
	[BatchName] nvarchar(50),
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int,
)
