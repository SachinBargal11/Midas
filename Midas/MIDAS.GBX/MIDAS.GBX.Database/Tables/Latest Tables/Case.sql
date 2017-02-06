CREATE TABLE [dbo].[Case]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, /*Unique Id*/
	[PatientId] INT NOT NULL, /*Linked to Id of Patient/User Table*/
	[CaseName] [NVARCHAR](50) NULL, /*General Description*/
	[CaseTypeId] [INT] NULL, /*Case Type, selected for the case when registered, as in Green Bills. List need to be ascertained*/
    [Age] DECIMAL(5, 2) NULL,  /*Age of the Patient when the case is registered*/
	[DateOfInjury] [DATETIME2] NOT NULL, /*Date of the Injury/Accident*/
	[LocationId] [INT] NOT NULL, /*Location of the healthcare center*/
    [PatientAddressId] [INT] NOT NULL, /*Current Address of the Patient when the case is registered, since same patient can come after few years and have different address*/
	[PatientContactInfoId] [INT] NULL, /*Current Contact Info of the Patient when the case is registered, since same patient can come after few years and have different Contact Info*/
    [EmpInfo] [INT] NULL, /*Current Employee Info of the Patient when the case is registered, since same patient can come after few years and have different Employee Info*/
	[InsuranceInfoId] [INT] NULL, /*Selected Insurance Info of the Patient when the case is registered, since same patient can come after few years and have different Insurance Info*/
	/*The Insurance type/company for same user can be single to multiple with one as a primary */
	[VehiclePlateNo] NVARCHAR(20) NULL,
	[AccidentAddressId] [INT] NULL, /*Address Of the Accident*/
    [CarrierCaseNo] NVARCHAR(50) NULL, /*This Case number is given by insurance company, after first info is send to the Insurance company*/
    [Transportation] BIT NOT NULL DEFAULT 0, /*Transport is required by the patient*/
    [DateOfFirstTreatment] DATETIME2 NOT NULL, /*Date of the first treatment taken by patient for this case*/
    [CaseStatusId] INT NULL, /*Status of this case, Open/Closed*/
    [AttorneyId] INT NULL, /*Attorney is assigned to this case*/

	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
)
GO


ALTER TABLE [dbo].[Case]  WITH CHECK ADD  CONSTRAINT [FK_Case_Patient2_PatientId] FOREIGN KEY([PatientId])
	REFERENCES [dbo].[Patient2] ([id])
GO

ALTER TABLE [dbo].[Case] CHECK CONSTRAINT [FK_Case_Patient2_PatientId]
GO
/*
ALTER TABLE [dbo].[Case]  WITH CHECK ADD  CONSTRAINT [FK_Case_Location_LocationID] FOREIGN KEY([LocationID])
	REFERENCES [dbo].[Location] ([id])
GO

ALTER TABLE [dbo].[Case] CHECK CONSTRAINT [FK_Case_Location_LocationID]
GO


ALTER TABLE [dbo].[Case]  WITH CHECK ADD  CONSTRAINT [FK_Case_AddressInfo_PatientAddressId] FOREIGN KEY([PatientAddressId])
	REFERENCES [dbo].[AddressInfo] ([id])
GO

ALTER TABLE [dbo].[Case] CHECK CONSTRAINT [FK_Case_AddressInfo_PatientAddressId]
GO

ALTER TABLE [dbo].[Case]  WITH CHECK ADD  CONSTRAINT [FK_Case_ContactInfo_PatientContactInfoId] FOREIGN KEY([PatientContactInfoId])
	REFERENCES [dbo].[ContactInfo] ([id])
GO

ALTER TABLE [dbo].[Case] CHECK CONSTRAINT [FK_Case_ContactInfo_PatientContactInfoId]
GO

ALTER TABLE [dbo].[Case]  WITH CHECK ADD  CONSTRAINT [FK_Case_PatientEmpInfo_EmpInfo] FOREIGN KEY([EmpInfo])
	REFERENCES [dbo].[PatientEmpInfo] ([id])
GO

ALTER TABLE [dbo].[Case] CHECK CONSTRAINT [FK_Case_PatientEmpInfo_EmpInfo]
GO

ALTER TABLE [dbo].[Case]  WITH CHECK ADD  CONSTRAINT [FK_Case_InsuranceInfo_InsuranceInfoId] FOREIGN KEY([InsuranceInfoId])
	REFERENCES [dbo].[InsuranceInfo] ([id])
GO

ALTER TABLE [dbo].[Case] CHECK CONSTRAINT [FK_Case_InsuranceInfo_InsuranceInfoId]
GO

ALTER TABLE [dbo].[Case]  WITH CHECK ADD  CONSTRAINT [FK_Case_AddressInfo_AccidentAddressId] FOREIGN KEY([AccidentAddressId])
	REFERENCES [dbo].[AddressInfo] ([id])
GO

ALTER TABLE [dbo].[Case] CHECK CONSTRAINT [FK_Case_AddressInfo_AccidentAddressId]
GO
*/
