
CREATE TABLE [dbo].[Patient](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[PatientID] [int] NOT NULL,
	[SSN] [nvarchar](50) NOT NULL,
	[WCBNo] [nvarchar](50) NULL,
	[JobTitle] [nvarchar](50) NULL,
	[WorkActivities] [nvarchar](50) NULL,
	[CarrierCaseNo] [nvarchar](50) NULL,
	[ChartNo] [nvarchar](50) NOT NULL,
	[CompanyID] [int] NOT NULL,
	[LocationID] [int] NOT NULL,
	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
	[Weight] [decimal](3, 2) NULL,
	[MaritalStatus] [tinyint] NULL,
	[DrivingLicence] [nvarchar](15) NULL,
	[EmergenceyContact] [nvarchar](50) NULL,
	[EmergenceyContactNumber] [nvarchar](50) NULL,
	[EmergenceyContactRelation] [nvarchar](50) NULL,
 CONSTRAINT [PK_Patient] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Patient]  WITH CHECK ADD  CONSTRAINT [FK_Patient_Company] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[Company] ([id])
GO

ALTER TABLE [dbo].[Patient] CHECK CONSTRAINT [FK_Patient_Company]
GO

ALTER TABLE [dbo].[Patient]  WITH CHECK ADD  CONSTRAINT [FK_Patient_Location] FOREIGN KEY([LocationID])
REFERENCES [dbo].[Location] ([id])
GO

ALTER TABLE [dbo].[Patient] CHECK CONSTRAINT [FK_Patient_Location]
GO

ALTER TABLE [dbo].[Patient]  WITH CHECK ADD  CONSTRAINT [FK_Patient_MaritalStatus] FOREIGN KEY([MaritalStatus])
REFERENCES [dbo].[MaritalStatus] ([Id])
GO

ALTER TABLE [dbo].[Patient] CHECK CONSTRAINT [FK_Patient_MaritalStatus]
GO

ALTER TABLE [dbo].[Patient]  WITH CHECK ADD  CONSTRAINT [FK_Patient_User] FOREIGN KEY([PatientID])
REFERENCES [dbo].[User] ([id])
GO

ALTER TABLE [dbo].[Patient] CHECK CONSTRAINT [FK_Patient_User]
GO


