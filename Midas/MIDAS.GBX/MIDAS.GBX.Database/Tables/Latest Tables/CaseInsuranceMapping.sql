CREATE TABLE [dbo].[CaseInsuranceMapping]
(
	[Id] INT NOT NULL IDENTITY, 
    [CaseId] INT NOT NULL, 
    [PatientInsuranceInfoId] INT NOT NULL,
	[IsPrimaryInsurance] [BIT] NULL DEFAULT 0,
	CONSTRAINT [PK_CaseInsuranceMapping] PRIMARY KEY ([Id]),
	CONSTRAINT [UK_CaseId_PatientInsuranceInfoId] UNIQUE ([CaseId], [PatientInsuranceInfoId])
)
GO

ALTER TABLE [dbo].[CaseInsuranceMapping]  WITH CHECK ADD  CONSTRAINT [FK_CaseInsuranceMapping_Case_CaseId] FOREIGN KEY([CaseId])
	REFERENCES [dbo].[Case] ([Id])
GO

ALTER TABLE [dbo].[CaseInsuranceMapping] CHECK CONSTRAINT [FK_CaseInsuranceMapping_Case_CaseId]	
GO

ALTER TABLE [dbo].[CaseInsuranceMapping]  WITH CHECK ADD  CONSTRAINT [FK_CaseInsuranceMapping_PatientInsuranceInfo_PatientInsuranceInfoId] FOREIGN KEY([PatientInsuranceInfoId])
	REFERENCES [dbo].[PatientInsuranceInfo] ([Id])
GO

ALTER TABLE [dbo].[CaseInsuranceMapping] CHECK CONSTRAINT [FK_CaseInsuranceMapping_PatientInsuranceInfo_PatientInsuranceInfoId]	
GO
