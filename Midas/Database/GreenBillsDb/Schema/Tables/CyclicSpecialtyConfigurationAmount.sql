CREATE TABLE [dbo].[CyclicSpecialtyConfigurationAmount](
	[csca] int IDENTITY(1,1) NOT NULL,
	[csc] int NOT NULL,
	[AccountId] nvarchar(20) NOT NULL,
	[Count] int NOT NULL,
	[Amount] money NOT NULL,
	
)
