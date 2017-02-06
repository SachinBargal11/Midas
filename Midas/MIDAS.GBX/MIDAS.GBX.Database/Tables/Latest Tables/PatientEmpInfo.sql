CREATE TABLE [dbo].[PatientEmpInfo]
(
	[Id] [INT] NOT NULL IDENTITY, 
	[PatientId] [INT] NOT NULL, 
	[JobTitle] [NVARCHAR](50) NULL, 
	[EmpName] [NVARCHAR](50) NULL, 
	[AddressInfoId] [INT] NOT NULL, 
	[ContactInfoId] [INT] NOT NULL, 
	[IsCurrentEmp] [BIT] NOT NULL DEFAULT 0, 

	[IsDeleted] [BIT] NULL DEFAULT (0),
	[CreateByUserID] [INT] NOT NULL,
	[CreateDate] [DATETIME2](7) NOT NULL,
	[UpdateByUserID] [INT] NULL,
	[UpdateDate] [DATETIME2](7) NULL, 
    CONSTRAINT [PK_PatientEmpInfo] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[PatientEmpInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientEmpInfo_Patient2_PatientId] FOREIGN KEY([PatientId])
	REFERENCES [dbo].[Patient2] ([id])
GO

ALTER TABLE [dbo].[PatientEmpInfo] CHECK CONSTRAINT [FK_PatientEmpInfo_Patient2_PatientId]
GO

ALTER TABLE [dbo].[PatientEmpInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientEmpInfo_AddressInfo_EmpAddressId] FOREIGN KEY([AddressInfoId])
	REFERENCES [dbo].[AddressInfo] ([id])
GO

ALTER TABLE [dbo].[PatientEmpInfo] CHECK CONSTRAINT [FK_PatientEmpInfo_AddressInfo_EmpAddressId]
GO

ALTER TABLE [dbo].[PatientEmpInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientEmpInfo_ContactInfo_EmpContactInfoId] FOREIGN KEY([ContactInfoId])
	REFERENCES [dbo].[ContactInfo] ([id])
GO

ALTER TABLE [dbo].[PatientEmpInfo] CHECK CONSTRAINT [FK_PatientEmpInfo_ContactInfo_EmpContactInfoId]
GO
