CREATE TABLE [dbo].[PatientInsurance](
	[ID] [INT] IDENTITY(1,1) NOT NULL,
	[PatientID] [INT] NOT NULL,
	[PolicyHolderName] [NVARCHAR](50) NOT NULL,
	[PolicyNumber] [NVARCHAR](50) NULL,
	[InsuranceID] [INT] NOT NULL,
	[InsuranceAddressID] [INT] NOT NULL,
	[IsPrimary] [BIT] NULL,
	[IsSecondry] [BIT] NULL,
	[IsDeleted] [BIT] NULL,
	[ExpiryDate] [DATETIME] NULL,
	[CreateByUserID] [INT] NOT NULL,
	[CreateDate] [DATETIME] NOT NULL,
	[UpdateByUserID] [INT] NULL,
	[UpdateDate] [DATETIME] NULL,
 CONSTRAINT [PK_PatientInsurance] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[PatientInsurance] ADD  CONSTRAINT [DF_PatientInsurance_IsPrimary]  DEFAULT ((0)) FOR [IsPrimary]
GO

ALTER TABLE [dbo].[PatientInsurance] ADD  CONSTRAINT [DF_PatientInsurance_IsSecondry]  DEFAULT ((0)) FOR [IsSecondry]
GO

ALTER TABLE [dbo].[PatientInsurance] ADD  CONSTRAINT [DF_PatientInsurance_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[PatientInsurance]  WITH CHECK ADD  CONSTRAINT [FK_PatientInsurance_Address] FOREIGN KEY([InsuranceAddressID])
REFERENCES [dbo].[Address] ([ID])
GO

ALTER TABLE [dbo].[PatientInsurance] CHECK CONSTRAINT [FK_PatientInsurance_Address]
GO

ALTER TABLE [dbo].[PatientInsurance]  WITH CHECK ADD  CONSTRAINT [FK_PatientInsurance_Insurance] FOREIGN KEY([InsuranceID])
REFERENCES [dbo].[Insurance] ([ID])
GO

ALTER TABLE [dbo].[PatientInsurance] CHECK CONSTRAINT [FK_PatientInsurance_Insurance]
GO

ALTER TABLE [dbo].[PatientInsurance]  WITH CHECK ADD  CONSTRAINT [FK_PatientInsurance_Patient] FOREIGN KEY([PatientID])
REFERENCES [dbo].[Patient] ([ID])
GO

ALTER TABLE [dbo].[PatientInsurance] CHECK CONSTRAINT [FK_PatientInsurance_Patient]
GO

ALTER TABLE [dbo].[PatientInsurance]  WITH CHECK ADD  CONSTRAINT [FK_PatientInsurance_User] FOREIGN KEY([CreateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[PatientInsurance] CHECK CONSTRAINT [FK_PatientInsurance_User]
GO

ALTER TABLE [dbo].[PatientInsurance]  WITH CHECK ADD  CONSTRAINT [FK_PatientInsurance_User1] FOREIGN KEY([UpdateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[PatientInsurance] CHECK CONSTRAINT [FK_PatientInsurance_User1]
GO
