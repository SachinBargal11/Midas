CREATE TABLE [dbo].[ReferralProcedureCodes]
(
	[Id] INT IDENTITY(1,1) NOT NULL,	
	[ReferralId] INT NOT NULL, 
    [ProcedureCodeId] INT NOT NULL, 

	[IsDeleted] [bit] NULL DEFAULT 0,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL, 
    CONSTRAINT [PK_ReferralProcedureCodes] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[ReferralProcedureCodes]  WITH CHECK ADD  CONSTRAINT [FK_ReferralProcedureCodes_Referral_ReferralId] FOREIGN KEY([ReferralId])
	REFERENCES [dbo].[Referral] ([Id])
GO

ALTER TABLE [dbo].[ReferralProcedureCodes] CHECK CONSTRAINT [FK_ReferralProcedureCodes_Referral_ReferralId]
GO

ALTER TABLE [dbo].[ReferralProcedureCodes]  WITH CHECK ADD  CONSTRAINT [FK_ReferralProcedureCodes_ProcedureCode_ProcedureCodeId] FOREIGN KEY([ProcedureCodeId])
	REFERENCES [dbo].[ProcedureCode] ([Id])
GO

ALTER TABLE [dbo].[ReferralProcedureCodes] CHECK CONSTRAINT [FK_ReferralProcedureCodes_ProcedureCode_ProcedureCodeId]
GO
