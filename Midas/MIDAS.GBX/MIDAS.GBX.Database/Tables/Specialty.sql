CREATE TABLE [dbo].[Specialty](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[SpecialityCode] [nvarchar](50) NOT NULL,
	[IsUnitApply] [bit] NULL,
	[ColorCode] [NVARCHAR](20) NULL,
	[MandatoryProcCode] [BIT] NOT NULL CONSTRAINT [DF_Specialty_MandatoryProcCode] DEFAULT 0,
	[SchedulingAvailable] [BIT] NOT NULL CONSTRAINT [DF_Specialty_SchedulingAvailable] DEFAULT 1,
	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

-- ALTER TABLE [dbo].[Specialty] ADD [ColorCode] [NVARCHAR](20) NULL
/*
ALTER TABLE [dbo].[Specialty] ADD [MandatoryProcCode] [BIT] NULL CONSTRAINT [DF_Specialty_MandatoryProcCode] DEFAULT 0
GO
UPDATE [dbo].[Specialty] SET [MandatoryProcCode] = 1
GO
ALTER TABLE [dbo].[Specialty] ALTER COLUMN [MandatoryProcCode] [BIT] NOT NULL
GO
ALTER TABLE [dbo].[Specialty] ADD [SchedulingAvailable] [BIT] NOT NULL CONSTRAINT [DF_Specialty_SchedulingAvailable] DEFAULT 1
GO
UPDATE [dbo].[Specialty] SET [SchedulingAvailable] = 1
GO
ALTER TABLE [dbo].[Specialty] ALTER COLUMN [SchedulingAvailable] [BIT] NOT NULL
GO
*/