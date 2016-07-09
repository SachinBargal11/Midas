﻿CREATE TABLE [dbo].[BillDetails]
(
	[BillDetailId] int identity(1,1) NOT NULL PRIMARY KEY,
	[ProcedureCodeId] int ,
	[CodeAmount] money,
	[BillId] nvarchar(50),
	[DateofVisit] Datetime,
	[AccountId] int,
	[Unit] float,
	[Price] money,
	[DoctAmount] money,
	[SpecialtyId] int,
	[IsGroupAmount] bit,
	[GroupAmount] money,
	[DailyLimit] money,
	[Modifier] nvarchar(1000),
	[cyclicApplied] bit,
	[CyclicOrignalAmount] money,
	[CyclicId] int,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int
	
)
