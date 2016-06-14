CREATE TABLE [dbo].[BillDetails]
(
	[BillDetailId] bigint identity(1,1) NOT NULL PRIMARY KEY,
	[ProcedureCodeId] bigint ,
	[CodeAmount] money,
	[BillId] nvarchar(50),
	[DateofVisit] Datetime,
	[AccountId] bigint,
	[Unit] float,
	[Price] money,
	[DoctAmount] money,
	[SpecialtyId] bigint,
	[IsGroupAmount] bit,
	[GroupAmount] money,
	[DailyLimit] money,
	[Modifier] nvarchar(1000),
	[cyclicApplied] bit,
	[CyclicOrignalAmount] money,
	[CyclicId] int
	CONSTRAINT [FK_BillDetail_BillId] FOREIGN KEY ([BillId]) REFERENCES [Bills](BillId)
	CONSTRAINT [FK_BillDetail_SpecialtyId] FOREIGN KEY ([SpecialtyId]) REFERENCES [Specialty](SpecialtyId),
	CONSTRAINT [FK_BillDetail_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Account](AccountId),
	CONSTRAINT [FK_BillDetail_ProcedureCodeId] FOREIGN KEY ([ProcedureCodeId]) REFERENCES [ProcedureCode](ProcedureCodeId)
)
