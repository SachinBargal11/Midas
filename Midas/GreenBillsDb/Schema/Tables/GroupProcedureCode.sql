CREATE TABLE [dbo].[GroupProcedureCode]
(
  GroupProcedureCodeId int,
  Name nvarchar(50),
  SpecialtyId int,
  Amount money,
  AccountId int,
  OfficeId int,
  [Deleted] bit,
  [CreatedDate] datetime,
  [UpdatedDate] datetime,
  [CreatedBy] int,
  [UpdatedBY]  int
)
