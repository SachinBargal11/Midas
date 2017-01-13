CREATE TABLE [dbo].[PatientEmpInfo]
(
	[id] [INT] NOT NULL,
	[PatientID] [INT] NOT NULL,
	[EmpName] [NVARCHAR](50) NULL,
	[PatientType] [INT] NOT NULL,
	[EmpStatus] [NVARCHAR](50) NULL,
	[StudentStatus] [NVARCHAR](50) NULL, 
	[IsDeleted] [BIT] NULL,
	[CreateByUserID] [INT] NOT NULL,
	[CreateDate] [DATETIME2](7) NOT NULL,
	[UpdateByUserID] [INT] NULL,
	[UpdateDate] [DATETIME2](7) NULL, 
    CONSTRAINT [PK_PatientEmpInfo] PRIMARY KEY ([id])
)
GO

ALTER TABLE [dbo].[PatientEmpInfo]  WITH CHECK ADD  CONSTRAINT [FK_PatientEmpInfo_User] FOREIGN KEY([PatientID])
REFERENCES [dbo].[User] ([id])
GO

ALTER TABLE [dbo].[PatientEmpInfo] CHECK CONSTRAINT [FK_PatientEmpInfo_User]
GO
