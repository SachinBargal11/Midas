CREATE TABLE [dbo].[InsuranceType]
(
	[Id] [TINYINT] NOT NULL,
	[InsuranceTypeText] [NVARCHAR](50) NOT NULL,
	[IsDeleted] [BIT] NULL,
	--[CreateByUserID] [INT] NOT NULL,
	--[CreateDate] [DATETIME2](7) NOT NULL,
	--[UpdateByUserID] [INT] NULL,
	--[UpdateDate] [DATETIME2](7) NULL,
	CONSTRAINT [PK_InsuranceType] PRIMARY KEY ([Id])
)
GO
/*
INSERT INTO [dbo].[InsuranceType] ([Id], [InsuranceTypeText], [IsDeleted])
	VALUES (1, 'Primary', 0), (2, 'Secondary', 0), (3, 'Major Medical', 0), (4, 'Private', 0)
*/