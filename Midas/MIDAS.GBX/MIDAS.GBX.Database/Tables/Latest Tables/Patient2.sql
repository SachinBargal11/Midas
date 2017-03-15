/*
Table Name: [dbo].[Patient2]
[PatientID] not required since the id from user table can be used
[DateOfBirth] not required since the user table has date of birth
Address not included as User table has address info
*/
CREATE TABLE [dbo].[Patient2](
	[Id] [INT] NOT NULL,
	[SSN] [NVARCHAR](20) NOT NULL, /*Social Security Number*/
	[CompanyId] [INT] NULL,
--	[LocationID] [INT] NULL, /*Location id where current case is registered*/
	[Weight] [DECIMAL](5, 2) NULL, /*Weight in KG OR Pounds*/
	[Height] [DECIMAL](5, 2) NULL,
	[MaritalStatusId] [TINYINT] NULL,
	[DateOfFirstTreatment] [DATETIME2](7) NULL,
	/*
	[AttorneyName] [NVARCHAR](50) NULL,
	[AttorneyAddressInfoId] [INT] NULL,
	[AttorneyContactInfoId] [INT] NULL,
	[PatientEmpInfoId] [INT] NULL,
	[InsuranceInfoId] [INT] NULL,
	[AccidentInfoId] [INT] NULL,
	[AttorneyInfoId] [INT] NULL,
	[ReferingOfficeId] [INT] NULL,
	*/
	[IsDeleted] [bit] NULL DEFAULT (0),
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL, 
    CONSTRAINT [PK_Patient2] PRIMARY KEY ([Id]), 
	CONSTRAINT [UK_Patient2_SSN] UNIQUE ([SSN])
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Patient2]  WITH CHECK ADD  CONSTRAINT [FK_Patient2_User_id] FOREIGN KEY([Id])
	REFERENCES [dbo].[User] ([Id])
GO

ALTER TABLE [dbo].[Patient2] CHECK CONSTRAINT [FK_Patient2_User_id]
GO

ALTER TABLE [dbo].[Patient2]  WITH CHECK ADD  CONSTRAINT [FK_Patient2_Company_CompanyId] FOREIGN KEY([CompanyId])
	REFERENCES [dbo].[Company] ([Id])
GO

ALTER TABLE [dbo].[Patient2] CHECK CONSTRAINT [FK_Patient2_Company_CompanyId]
GO

--ALTER TABLE [dbo].[Patient2]  WITH CHECK ADD  CONSTRAINT [FK_Patient2_Location_LocationID] FOREIGN KEY([LocationID])
--REFERENCES [dbo].[Location] ([Id])
--GO

--ALTER TABLE [dbo].[Patient2] CHECK CONSTRAINT [FK_Patient2_Location]
--GO

ALTER TABLE [dbo].[Patient2]  WITH CHECK ADD  CONSTRAINT [FK_Patient2_MaritalStatusId] FOREIGN KEY([MaritalStatusId])
	REFERENCES [dbo].[MaritalStatus] ([Id])
GO

ALTER TABLE [dbo].[Patient2] CHECK CONSTRAINT [FK_Patient2_MaritalStatusId]
GO
/*
ALTER TABLE [dbo].[Patient2]  WITH CHECK ADD  CONSTRAINT [FK_Patient2_AddressInfo_AttorneyAddressInfoId] FOREIGN KEY([AttorneyAddressInfoId])
	REFERENCES [dbo].[AddressInfo] ([Id])
GO

ALTER TABLE [dbo].[Patient2] CHECK CONSTRAINT [FK_Patient2_AddressInfo_AttorneyAddressInfoId]
GO

ALTER TABLE [dbo].[Patient2]  WITH CHECK ADD  CONSTRAINT [FK_Patient2_AddressInfo_AttorneyContactInfoId] FOREIGN KEY([AttorneyContactInfoId])
	REFERENCES [dbo].[ContactInfo] ([Id])
GO

ALTER TABLE [dbo].[Patient2] CHECK CONSTRAINT [FK_Patient2_AddressInfo_AttorneyContactInfoId]
GO

ALTER TABLE [dbo].[Patient2]  WITH CHECK ADD  CONSTRAINT [FK_Patient2_PatientEmpInfo_PatientEmpInfoId] FOREIGN KEY([PatientEmpInfoId])
	REFERENCES [dbo].[PatientEmpInfo] ([Id])
GO

ALTER TABLE [dbo].[Patient2] CHECK CONSTRAINT [FK_Patient2_PatientEmpInfo_PatientEmpInfoId]
GO

ALTER TABLE [dbo].[Patient2]  WITH CHECK ADD  CONSTRAINT [FK_Patient2_PatientInsuranceInfo_InsuranceInfoId] FOREIGN KEY([InsuranceInfoId])
	REFERENCES [dbo].[PatientInsuranceInfo] ([Id])
GO

ALTER TABLE [dbo].[Patient2] CHECK CONSTRAINT [FK_Patient2_PatientInsuranceInfo_InsuranceInfoId]
GO
*/

--ALTER TABLE [dbo].[Patient2] DROP COLUMN [CompanyId]
/*
Link Patient with user company table
*/
GO