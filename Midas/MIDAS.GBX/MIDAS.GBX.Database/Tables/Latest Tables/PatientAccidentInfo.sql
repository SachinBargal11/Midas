﻿CREATE TABLE [dbo].[PatientAccidentInfo]
(
	[Id] [INT] NOT NULL IDENTITY(1,1), 
	[PatientId] [INT] NOT NULL, 
	[AccidentDate] [DATETIME2](7) NULL, 
	[PlateNumber] [NVARCHAR](50) NULL,
	[ReportNumber] [NVARCHAR](50) NULL, 
	[AccidentAddressInfoId] [INT] NOT NULL, 
	[HospitalName] [NVARCHAR](128) NULL, 
	[HospitalAddressInfoId] [INT] NOT NULL, 
	[DateOfAdmission] [DATETIME2](7) NULL, 
	[AdditionalPatients] [NVARCHAR](128) NULL, 
	[DescribeInjury] [NVARCHAR](128) NULL, 
	[PatientTypeId] [INT] NOT NULL, 
	[IsCurrentAccident] [BIT] NOT NULL DEFAULT 0, 

	[IsDeleted] [BIT] NULL DEFAULT (0),
	[CreateByUserID] [INT] NOT NULL,
	[CreateDate] [DATETIME2](7) NOT NULL,
	[UpdateByUserID] [INT] NULL,
	[UpdateDate] [DATETIME2](7) NULL, 
    CONSTRAINT [PK_AccidentInfo] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[PatientAccidentInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientAccidentInfo_Patient2_PatientId] FOREIGN KEY([PatientId])
	REFERENCES [dbo].[Patient2] ([id])
GO

ALTER TABLE [dbo].[PatientAccidentInfo] CHECK CONSTRAINT [FK_PatientAccidentInfo_Patient2_PatientId]
GO

ALTER TABLE [dbo].[PatientAccidentInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientAccidentInfo_AddressInfo_AccidentAddressInfoId] FOREIGN KEY([AccidentAddressInfoId])
	REFERENCES [dbo].[AddressInfo] ([id])
GO

ALTER TABLE [dbo].[PatientAccidentInfo] CHECK CONSTRAINT [FK_PatientAccidentInfo_AddressInfo_AccidentAddressInfoId]
GO

ALTER TABLE [dbo].[PatientAccidentInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientAccidentInfo_AddressInfo_HospitalAddressInfoId] FOREIGN KEY([HospitalAddressInfoId])
	REFERENCES [dbo].[AddressInfo] ([id])
GO

ALTER TABLE [dbo].[PatientAccidentInfo] CHECK CONSTRAINT [FK_PatientAccidentInfo_AddressInfo_HospitalAddressInfoId]
GO