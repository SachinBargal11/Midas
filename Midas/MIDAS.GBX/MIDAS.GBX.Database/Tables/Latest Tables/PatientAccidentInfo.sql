CREATE TABLE [dbo].[PatientAccidentInfo]
(
	[Id] [INT] NOT NULL IDENTITY(1,1), 
	--[PatientId] [INT] NOT NULL, 
	[CaseId] [INT] NOT NULL,
	[AccidentDate] [DATETIME2](7) NULL, 
	[PlateNumber] [NVARCHAR](50) NULL,
	[ReportNumber] [NVARCHAR](50) NULL, 
	[AccidentAddressInfoId] [INT] NOT NULL, 
	[HospitalName] [NVARCHAR](128) NULL, 
	[HospitalAddressInfoId] [INT] NOT NULL, 
	[DateOfAdmission] [DATETIME2](7) NULL, 
	[AdditionalPatients] [NVARCHAR](128) NULL, 
	[DescribeInjury] [NVARCHAR](128) NULL, 
	[PatientTypeId] [TINYINT] NOT NULL, 
	--[IsCurrentAccident] [BIT] NOT NULL DEFAULT 0, 

	[IsDeleted] [BIT] NULL DEFAULT (0),
	[CreateByUserID] [INT] NOT NULL,
	[CreateDate] [DATETIME2](7) NOT NULL,
	[UpdateByUserID] [INT] NULL,
	[UpdateDate] [DATETIME2](7) NULL, 
    CONSTRAINT [PK_AccidentInfo] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[PatientAccidentInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientAccidentInfo_Case_CaseId] FOREIGN KEY([CaseId])
	REFERENCES [dbo].[Case] ([Id])
GO

ALTER TABLE [dbo].[PatientAccidentInfo] CHECK CONSTRAINT [FK_PatientAccidentInfo_Case_CaseId]
GO

ALTER TABLE [dbo].[PatientAccidentInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientAccidentInfo_AddressInfo_AccidentAddressInfoId] FOREIGN KEY([AccidentAddressInfoId])
	REFERENCES [dbo].[AddressInfo] ([Id])
GO

ALTER TABLE [dbo].[PatientAccidentInfo] CHECK CONSTRAINT [FK_PatientAccidentInfo_AddressInfo_AccidentAddressInfoId]
GO

ALTER TABLE [dbo].[PatientAccidentInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientAccidentInfo_AddressInfo_HospitalAddressInfoId] FOREIGN KEY([HospitalAddressInfoId])
	REFERENCES [dbo].[AddressInfo] ([Id])
GO

ALTER TABLE [dbo].[PatientAccidentInfo] CHECK CONSTRAINT [FK_PatientAccidentInfo_AddressInfo_HospitalAddressInfoId]
GO

--ALTER TABLE [dbo].[PatientAccidentInfo] ALTER COLUMN [PatientTypeId] [TINYINT] NULL 
ALTER TABLE [dbo].[PatientAccidentInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientAccidentInfo_PatientType_PatientTypeId] FOREIGN KEY([PatientTypeId])
	REFERENCES [dbo].[PatientType] ([Id])
GO

ALTER TABLE [dbo].[PatientAccidentInfo] CHECK CONSTRAINT [FK_PatientAccidentInfo_PatientType_PatientTypeId]
GO