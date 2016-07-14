CREATE TABLE [dbo].[ProcedureCode](
	[ID] [INT] IDENTITY(1,1) NOT NULL,
	[Code] [NVARCHAR](20) NULL,
	[Description] [NVARCHAR](250) NULL,
	[Amount] [MONEY] NULL,
	[LongDescription] [NVARCHAR](1000) NULL,
	[Modifier] [NVARCHAR](20) NULL,
	[RVU] [NVARCHAR](200) NULL,
	[ValueCode] [NVARCHAR](200) NULL,
	[LongModifier] [NVARCHAR](100) NULL,
	[LocationId] [INT] NULL,
	[SpecialtyId] [INT] NULL,
	[IsDeleted] [BIT] NULL,
	[CreateByUserID] [INT] NOT NULL,
	[CreateDate] [DATETIME] NULL,
	[UpdateByUserID] [INT] NULL,
	[UpdateDate] [DATETIME] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[ProcedureCode]  WITH CHECK ADD  CONSTRAINT [FK_ProcedureCode_Specialty] FOREIGN KEY([SpecialtyId])
REFERENCES [dbo].[Specialty] ([ID])
GO

ALTER TABLE [dbo].[ProcedureCode] CHECK CONSTRAINT [FK_ProcedureCode_Specialty]
GO

ALTER TABLE [dbo].[ProcedureCode]  WITH CHECK ADD  CONSTRAINT [FK_ProcedureCode_User] FOREIGN KEY([CreateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[ProcedureCode] CHECK CONSTRAINT [FK_ProcedureCode_User]
GO

ALTER TABLE [dbo].[ProcedureCode]  WITH CHECK ADD  CONSTRAINT [FK_ProcedureCode_User1] FOREIGN KEY([UpdateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[ProcedureCode] CHECK CONSTRAINT [FK_ProcedureCode_User1]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'?' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ProcedureCode', @level2type=N'COLUMN',@level2name=N'RVU'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'?' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ProcedureCode', @level2type=N'COLUMN',@level2name=N'ValueCode'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'?' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ProcedureCode', @level2type=N'COLUMN',@level2name=N'LongModifier'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'?' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ProcedureCode', @level2type=N'COLUMN',@level2name=N'LocationId'
GO

