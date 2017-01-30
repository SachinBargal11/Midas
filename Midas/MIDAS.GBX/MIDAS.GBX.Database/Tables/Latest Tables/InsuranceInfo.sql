CREATE TABLE [dbo].[InsuranceInfo]
(
	[Id] INT NOT NULL IDENTITY, /*Unique Id*/
	[PatientId] [INT] NOT NULL, /*Linked to Id of Patient/User Table*/
    [InsuranceId] INT NOT NULL, /*Linked to Id of Insurance List Master Table*/
    [PolicyNo] NVARCHAR(50) NOT NULL, /*Patient's Policy Number for the Insurance*/
	[PolicyHoldersName] [NVARCHAR](50) NULL, /*Patient's Policy Holder's Name for the Insurance*/
	[InsuranceAddressId] [INT] NOT NULL, /*Current Address of the Insurance Company, Nearest One*/
	[InsuranceContactInfoId] [INT] NULL,/*Current Contact Info of the Insurance Company, Nearest One*/
	[IsPrimaryInsurance] [BIT] NOT NULL DEFAULT 0, /*Is this Primary the Insurance Company*/
	CONSTRAINT [PK_InsuranceInfo] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[InsuranceInfo]  WITH CHECK ADD  CONSTRAINT [FK_InsuranceInfo_User_PatientID] FOREIGN KEY([PatientID])
REFERENCES [dbo].[User] ([id])
GO

ALTER TABLE [dbo].[InsuranceInfo] CHECK CONSTRAINT [FK_InsuranceInfo_User_PatientID]
GO

ALTER TABLE [dbo].[InsuranceInfo]  WITH CHECK ADD  CONSTRAINT [FK_InsuranceInfo_AddressInfo_InsuranceAddressId] FOREIGN KEY([InsuranceAddressId])
	REFERENCES [dbo].[AddressInfo] ([id])
GO

ALTER TABLE [dbo].[InsuranceInfo] CHECK CONSTRAINT [FK_InsuranceInfo_AddressInfo_InsuranceAddressId]
GO

ALTER TABLE [dbo].[InsuranceInfo]  WITH CHECK ADD  CONSTRAINT [FK_InsuranceInfo_ContactInfo_InsuranceContactInfoId] FOREIGN KEY([InsuranceContactInfoId])
	REFERENCES [dbo].[ContactInfo] ([id])
GO

ALTER TABLE [dbo].[InsuranceInfo] CHECK CONSTRAINT [FK_InsuranceInfo_ContactInfo_InsuranceContactInfoId]
GO
