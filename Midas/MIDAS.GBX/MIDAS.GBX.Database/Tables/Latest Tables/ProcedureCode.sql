CREATE TABLE [dbo].[ProcedureCode](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ProcedureCodeText] [nvarchar](50) NOT NULL,
	[ProcedureCodeDesc] [nvarchar](250) NULL,
	[CompanyId] [int] NULL,
	[Amount] [money] NULL,
	[SpecialityId] [INT] NULL,
	[RoomId] [INT] NULL, 
	[RoomTestId] [INT] NULL,
	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
	CONSTRAINT [PK_ProcedureCode] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[ProcedureCode] ADD  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[ProcedureCode]  WITH CHECK ADD  CONSTRAINT [FK_ProcedureCode_Company_CompanyId] FOREIGN KEY([CompanyId])
REFERENCES [dbo].[Company] ([id])
GO

ALTER TABLE [dbo].[ProcedureCode] CHECK CONSTRAINT [FK_ProcedureCode_Company_CompanyId]
GO

--ALTER TABLE [dbo].[ProcedureCode] ADD [SpecialityId] INT NULL
--GO
--ALTER TABLE [dbo].[ProcedureCode] ADD [RoomId] INT NULL
--GO
--ALTER TABLE [dbo].[ProcedureCode] ADD [RoomTestId] INT NULL
--GO

ALTER TABLE [dbo].[ProcedureCode]  WITH CHECK ADD  CONSTRAINT [FK_ProcedureCode_Speciality_SpecialityId] FOREIGN KEY([SpecialityId])
	REFERENCES [dbo].[Specialty] ([id])
GO

ALTER TABLE [dbo].[ProcedureCode] CHECK CONSTRAINT [FK_ProcedureCode_Speciality_SpecialityId]
GO

ALTER TABLE [dbo].[ProcedureCode]  WITH CHECK ADD  CONSTRAINT [FK_ProcedureCode_Room_SpecialityId] FOREIGN KEY([RoomId])
	REFERENCES [dbo].[Room] ([id])
GO

ALTER TABLE [dbo].[ProcedureCode] CHECK CONSTRAINT [FK_ProcedureCode_Room_SpecialityId]
GO

ALTER TABLE [dbo].[ProcedureCode]  WITH CHECK ADD  CONSTRAINT [FK_ProcedureCode_RoomTest_RoomTestId] FOREIGN KEY([RoomTestId])
	REFERENCES [dbo].[RoomTest] ([id])
GO

ALTER TABLE [dbo].[ProcedureCode] CHECK CONSTRAINT [FK_ProcedureCode_RoomTest_RoomTestId]
GO

ALTER TABLE [dbo].[ProcedureCode]  WITH CHECK ADD  CONSTRAINT [FK_ProcedureCode_RoomTest_RoomTestId] FOREIGN KEY([RoomTestId])
	REFERENCES [dbo].[RoomTest] ([id])
GO

ALTER TABLE [dbo].[ProcedureCode] CHECK CONSTRAINT [FK_ProcedureCode_RoomTest_RoomTestId]
GO


