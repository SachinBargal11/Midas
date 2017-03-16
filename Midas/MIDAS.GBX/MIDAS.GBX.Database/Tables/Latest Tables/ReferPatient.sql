CREATE TABLE [dbo].[ReferPatient]
(
	[Id] INT NOT NULL IDENTITY(1, 1),
    [CaseId] INT NOT NULL, 
	[ReferringCompanyId] INT NOT NULL, 
    [ReferringLocationId] INT NOT NULL, 
    [ReferringDoctorId] INT NOT NULL, 
    [ReferredToCompanyId] INT NULL, 
    [ReferredToLocationId] INT NULL, 
    [ReferredToDoctorId] INT NULL, 
    [ReferredToRoomId] INT NULL, 
    [Note] NVARCHAR(250) NULL, 
	[ReferredByEmail] [NVARCHAR](50) NULL, -- This email should not be a active user in MIDAS, else give message the user exists in MIDAS
	[ReferralAccepted] [BIT] NULL DEFAULT 0, -- When the user register with MIDAS this will se it as true, these referred patient will be displayed with limited data

	[IsDeleted] [bit] NULL DEFAULT 0,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
    CONSTRAINT [PK_RefferPatient] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[ReferPatient]  WITH CHECK ADD  CONSTRAINT [FK_ReferPatient_Case_CaseId] FOREIGN KEY([CaseId])
	REFERENCES [dbo].[Case] ([Id])
GO

ALTER TABLE [dbo].[ReferPatient] CHECK CONSTRAINT [FK_ReferPatient_Case_CaseId]
GO

ALTER TABLE [dbo].[ReferPatient]  WITH CHECK ADD  CONSTRAINT [FK_ReferPatient_Company_ReferringCompanyId] FOREIGN KEY([ReferringCompanyId])
	REFERENCES [dbo].[Company] ([Id])
GO

ALTER TABLE [dbo].[ReferPatient] CHECK CONSTRAINT [FK_ReferPatient_Company_ReferringCompanyId]
GO

ALTER TABLE [dbo].[ReferPatient]  WITH CHECK ADD  CONSTRAINT [FK_ReferPatient_Location_ReferringLocationId] FOREIGN KEY([ReferringLocationId])
	REFERENCES [dbo].[Location] ([Id])
GO

ALTER TABLE [dbo].[ReferPatient] CHECK CONSTRAINT [FK_ReferPatient_Location_ReferringLocationId]
GO

ALTER TABLE [dbo].[ReferPatient]  WITH CHECK ADD  CONSTRAINT [FK_ReferPatient_Doctor_ReferringDoctorId] FOREIGN KEY([ReferringDoctorId])
	REFERENCES [dbo].[Doctor] ([Id])
GO

ALTER TABLE [dbo].[ReferPatient] CHECK CONSTRAINT [FK_ReferPatient_Doctor_ReferringDoctorId]
GO

ALTER TABLE [dbo].[ReferPatient]  WITH CHECK ADD  CONSTRAINT [FK_ReferPatient_Company_ReferredToCompanyId] FOREIGN KEY([ReferredToCompanyId])
	REFERENCES [dbo].[Company] ([Id])
GO

ALTER TABLE [dbo].[ReferPatient] CHECK CONSTRAINT [FK_ReferPatient_Company_ReferredToCompanyId]
GO

ALTER TABLE [dbo].[ReferPatient]  WITH CHECK ADD  CONSTRAINT [FK_ReferPatient_Location_ReferredToLocationId] FOREIGN KEY([ReferredToLocationId])
	REFERENCES [dbo].[Location] ([Id])
GO

ALTER TABLE [dbo].[ReferPatient] CHECK CONSTRAINT [FK_ReferPatient_Location_ReferredToLocationId]
GO

ALTER TABLE [dbo].[ReferPatient]  WITH CHECK ADD  CONSTRAINT [FK_ReferPatient_Doctor_ReferredToDoctorId] FOREIGN KEY([ReferredToDoctorId])
	REFERENCES [dbo].[Doctor] ([Id])
GO

ALTER TABLE [dbo].[ReferPatient] CHECK CONSTRAINT [FK_ReferPatient_Doctor_ReferredToDoctorId]
GO

ALTER TABLE [dbo].[ReferPatient]  WITH CHECK ADD  CONSTRAINT [FK_ReferPatient_Room_ReferredToRoomId] FOREIGN KEY([ReferredToRoomId])
	REFERENCES [dbo].[Room] ([Id])
GO

ALTER TABLE [dbo].[ReferPatient] CHECK CONSTRAINT [FK_ReferPatient_Room_ReferredToRoomId]
GO