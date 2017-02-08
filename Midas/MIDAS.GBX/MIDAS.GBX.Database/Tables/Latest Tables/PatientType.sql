CREATE TABLE [dbo].[PatientType]
(
	[Id] [TINYINT] NOT NULL,
	[PatientTypeText] [NVARCHAR](50) NOT NULL,
	[IsDeleted] [BIT] NULL,
	--[CreateByUserID] [INT] NOT NULL,
	--[CreateDate] [DATETIME2](7) NOT NULL,
	--[UpdateByUserID] [INT] NULL,
	--[UpdateDate] [DATETIME2](7) NULL,
	CONSTRAINT [PK_PatientType] PRIMARY KEY ([Id])
)
GO
/*
INSERT INTO [dbo].[PatientType] ([Id], [PatientTypeText], [IsDeleted])
	VALUES (1, 'Bicyclist', 0), (2, 'Driver', 0), (3, 'Passenger', 0), (4, 'Pedestrain', 0), (5, 'OD', 0)
*/