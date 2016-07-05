CREATE TABLE [dbo].[BillStatusHistory]
(
BillStatusHistoryId int identity(1,1),
  [BillId]int,
  [LastStatusId]int,
  [CreatedDate] datetime,
  [UpdatedDate] datetime,
  [CreatedBy] int,
  [UpdatedBY]  int,
  IPAddress varchar(15),
)
