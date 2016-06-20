CREATE TABLE [dbo].[CyclicProcedureConfigurationAmount](
	[cpca] int IDENTITY(1,1) NOT NULL,
	[csc] int NOT NULL,
	[AccountId] nvarchar(20) NOT NULL,
	[ProcdureCodeId] int,
	[Count] int NOT NULL,
	[Amount] money NULL,
	[Percent] numeric(8, 2) NOT NULL,
	[Type] nvarchar (10) NOT NULL,
)
