CREATE TABLE [dbo].[DoctorCaseConsentApproval]
(
	[Id] INT NOT NULL IDENTITY(1, 1),
	[DoctorId] INT NOT NULL,
	[CaseId] INT NOT NULL, 
	[ConsentReceived] NVARCHAR(50) NULL, 

	[IsDeleted] [bit] NULL DEFAULT 0,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
    CONSTRAINT [PK_DoctorCaseConsentApproval] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[DoctorCaseConsentApproval]  WITH CHECK ADD  CONSTRAINT [FK_DoctorCaseConsentApproval_Case_CaseId] FOREIGN KEY([CaseId])
	REFERENCES [dbo].[Case] ([Id])
GO

ALTER TABLE [dbo].[DoctorCaseConsentApproval] CHECK CONSTRAINT [FK_DoctorCaseConsentApproval_Case_CaseId]
GO

ALTER TABLE [dbo].[DoctorCaseConsentApproval]  WITH CHECK ADD  CONSTRAINT [FK_DoctorCaseConsentApproval_Doctor_DoctorId] FOREIGN KEY([DoctorId])
	REFERENCES [dbo].[Doctor] ([id])
GO

ALTER TABLE [dbo].[DoctorCaseConsentApproval] CHECK CONSTRAINT [FK_DoctorCaseConsentApproval_Doctor_DoctorId]
GO