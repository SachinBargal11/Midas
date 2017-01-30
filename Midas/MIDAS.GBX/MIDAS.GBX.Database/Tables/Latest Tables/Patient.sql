/*
Table Name: [dbo].[Patient]
[PatientID] not required since the id from user table can be used
[DateOfBirth] not required since the user table has date of birth
Address not included as User table has address info
*/
CREATE TABLE [dbo].[Patient](
	[id] [int] NOT NULL,
	[SSN] [nvarchar](20) NOT NULL, /*Social Security Number*/
	[WCBNo] [nvarchar](20) NULL, /*Since this info remains constant for the user in a lifetime*/
	[LocationID] [int] NOT NULL, /*Location id where current case is registered*/
	[Weight] [DECIMAL](5, 2) NOT NULL, /*Weight in KG OR Pounds*/
	[MaritalStatus] [TINYINT] NULL, /*Current Status*/
	[DrivingLicence] [NVARCHAR](15) NULL, /*Current Driving Licence Number*/
	[EmergencyContactName] [NVARCHAR](50) NULL, /*Emergency Contact Person Name*/
	[EmergencyContactRelation] [NVARCHAR](50) NULL, /*Emergency Contact Person's Relation*/
	[EmergencyContactNumber] [NVARCHAR](50) NULL, /*Emergency Contact Person's Contact Number*/

	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Patient]  WITH CHECK ADD  CONSTRAINT [FK_Patient_Location] FOREIGN KEY([LocationID])
REFERENCES [dbo].[Location] ([id])
GO

ALTER TABLE [dbo].[Patient] CHECK CONSTRAINT [FK_Patient_Location]
GO

ALTER TABLE [dbo].[Patient]  WITH CHECK ADD  CONSTRAINT [FK_Patient_User] FOREIGN KEY([id])
REFERENCES [dbo].[User] ([id])
GO

ALTER TABLE [dbo].[Patient] CHECK CONSTRAINT [FK_Patient_User]
GO

ALTER TABLE [dbo].[Patient]  WITH CHECK ADD  CONSTRAINT [FK_Patient_MaritalStatus] FOREIGN KEY([MaritalStatus])
REFERENCES [dbo].[MaritalStatus] ([id])
GO

ALTER TABLE [dbo].[Patient] CHECK CONSTRAINT [FK_Patient_MaritalStatus]
GO
