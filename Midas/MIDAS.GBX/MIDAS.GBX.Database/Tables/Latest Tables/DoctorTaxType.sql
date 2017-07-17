CREATE TABLE [dbo].[DoctorTaxType]
(
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [Name] NVARCHAR(50) NOT NULL, 
    [Description] NVARCHAR(128) NULL, 
    [IsDeleted] [bit] NULL CONSTRAINT [DF_DoctorTaxType_IsDeleted] DEFAULT 0,
    [CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
    CONSTRAINT [PK_DoctorTaxType] PRIMARY KEY ([Id])
)
GO
