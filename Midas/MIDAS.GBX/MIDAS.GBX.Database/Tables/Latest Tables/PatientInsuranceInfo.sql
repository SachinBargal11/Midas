CREATE TABLE [dbo].[PatientInsuranceInfo]
(
	[Id] [int] NOT NULL,
	[PatientID] [int] NOT NULL,
	[InsuranceCode] [nvarchar](10) NULL,
	[InsuranceType] [int] NOT NULL,
	[Authorization] [nvarchar](50) NULL,
	[InsuranceId] [nvarchar](50) NULL, 
	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL, 
    CONSTRAINT [PK_PatientInsuranceInfo] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[PatientInsuranceInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientInsuranceInfo_User] FOREIGN KEY([PatientID])
REFERENCES [dbo].[User] ([id])
GO

ALTER TABLE [dbo].[PatientInsuranceInfo] CHECK CONSTRAINT [FK_PatientInsuranceInfo_User]	
GO

EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'?',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'PatientInsuranceInfo',
    @level2type = N'COLUMN',
    @level2name = N'InsuranceId'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'?',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'PatientInsuranceInfo',
    @level2type = N'COLUMN',
    @level2name = N'InsuranceCode'