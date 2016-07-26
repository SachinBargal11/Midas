CREATE TABLE [dbo].[CaseAssociatedDiagnosisCode]
(
  CaseAssociatedDiagnosisCodeId int identity(1,1),
  CaseId int,
  DiagnosiCodeId int,
  SpecialtyId int,
  [Deleted] bit,
  [CreatedDate] datetime,
  [UpdatedDate] datetime,
  [CreatedBy] int,
  [UpdatedBY]  int
)
