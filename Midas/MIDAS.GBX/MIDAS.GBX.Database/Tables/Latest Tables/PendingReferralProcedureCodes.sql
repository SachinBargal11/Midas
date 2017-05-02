CREATE TABLE [dbo].[PendingReferralProcedureCodes]
(
	[Id] INT IDENTITY(1,1) NOT NULL,	
	[PendingReferralId] INT NOT NULL, 
    [ProcedureCodeId] INT NOT NULL, 

	[IsDeleted] [bit] NULL DEFAULT 0,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL, 
    CONSTRAINT [PK_PendingReferralProcedureCodes] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[PendingReferralProcedureCodes]  WITH CHECK ADD  CONSTRAINT [FK_PendingReferralProcedureCodes_PendingReferral_PendingReferralId] FOREIGN KEY([PendingReferralId])
	REFERENCES [dbo].[PendingReferral] ([Id])
GO

ALTER TABLE [dbo].[PendingReferralProcedureCodes] CHECK CONSTRAINT [FK_PendingReferralProcedureCodes_PendingReferral_PendingReferralId]
GO

ALTER TABLE [dbo].[PendingReferralProcedureCodes]  WITH CHECK ADD  CONSTRAINT [FK_PendingReferralProcedureCodes_ProcedureCode_ProcedureCodeId] FOREIGN KEY([ProcedureCodeId])
	REFERENCES [dbo].[ProcedureCode] ([Id])
GO

ALTER TABLE [dbo].[PendingReferralProcedureCodes] CHECK CONSTRAINT [FK_PendingReferralProcedureCodes_ProcedureCode_ProcedureCodeId]
GO
