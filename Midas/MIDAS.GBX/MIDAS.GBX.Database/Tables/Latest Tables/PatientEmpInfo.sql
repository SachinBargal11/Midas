CREATE TABLE [dbo].[PatientEmpInfo]
(
	[Id] [INT] NOT NULL IDENTITY, /*Unique Id*/
	[PatientId] [INT] NOT NULL, /*Linked to Id of Patient/User Table*/
	[JobTitle] [NVARCHAR](50) NULL, /*Job title of  the Patient*/
	[EmpName] [NVARCHAR](50) NULL, /*Employee Name*/
	[EmpAddressId] [INT] NOT NULL, /*Current Address of the Employer*/
	[EmpContactInfoId] [INT] NOT NULL, /*Current Contact Info of the Employer*/
	[IsCurrentEmp] [BIT] NOT NULL DEFAULT 0, /*Is this current the Employer*/

	[IsDeleted] [BIT] NULL,
	[CreateByUserID] [INT] NOT NULL,
	[CreateDate] [DATETIME2](7) NOT NULL,
	[UpdateByUserID] [INT] NULL,
	[UpdateDate] [DATETIME2](7) NULL, 
    CONSTRAINT [PK_PatientEmpInfo] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[PatientEmpInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientEmpInfo_User_PatientID] FOREIGN KEY([PatientID])
REFERENCES [dbo].[User] ([id])
GO

ALTER TABLE [dbo].[PatientEmpInfo] CHECK CONSTRAINT [FK_PatientEmpInfo_User_PatientID]
GO

ALTER TABLE [dbo].[PatientEmpInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientEmpInfo_AddressInfo_EmpAddressId] FOREIGN KEY([EmpAddressId])
	REFERENCES [dbo].[AddressInfo] ([id])
GO

ALTER TABLE [dbo].[PatientEmpInfo] CHECK CONSTRAINT [FK_PatientEmpInfo_AddressInfo_EmpAddressId]
GO

ALTER TABLE [dbo].[PatientEmpInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientEmpInfo_ContactInfo_EmpContactInfoId] FOREIGN KEY([EmpContactInfoId])
	REFERENCES [dbo].[ContactInfo] ([id])
GO

ALTER TABLE [dbo].[PatientEmpInfo] CHECK CONSTRAINT [FK_PatientEmpInfo_ContactInfo_EmpContactInfoId]
GO
