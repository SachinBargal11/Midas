CREATE TABLE [dbo].[Referral]
(
	[Id] INT NOT NULL IDENTITY(1, 1),
    [CaseId] INT NOT NULL, 
	[ReferringCompanyId] INT NOT NULL, 
    [ReferringLocationId] INT NOT NULL, 
	[ReferringUserId] INT NOT NULL,
    [ReferredToCompanyId] INT NULL, 
    [ReferredToLocationId] INT NULL, 
    [ReferredToDoctorId] INT NULL, 
	[ReferredToSpecialtyId] INT NULL,
    [ReferredToRoomId] INT NULL, 
	[ReferredToRoomTestId] INT NULL,
    [Note] NVARCHAR(250) NULL, 
	[ReferredByEmail] [NVARCHAR](50) NULL,
	[ReferredToEmail] [NVARCHAR](50) NULL,
	[ReferralAccepted] [BIT] NULL DEFAULT 0,

	[IsDeleted] [bit] NULL DEFAULT 0,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
    CONSTRAINT [PK_RefferPatient] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_Case_CaseId] FOREIGN KEY([CaseId])
	REFERENCES [dbo].[Case] ([Id])
GO

ALTER TABLE [dbo].[Referral] CHECK CONSTRAINT [FK_Referral_Case_CaseId]
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_Company_ReferringCompanyId] FOREIGN KEY([ReferringCompanyId])
	REFERENCES [dbo].[Company] ([Id])
GO

ALTER TABLE [dbo].[Referral] CHECK CONSTRAINT [FK_Referral_Company_ReferringCompanyId]
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_Location_ReferringLocationId] FOREIGN KEY([ReferringLocationId])
	REFERENCES [dbo].[Location] ([Id])
GO

ALTER TABLE [dbo].[Referral] CHECK CONSTRAINT [FK_Referral_Location_ReferringLocationId]
GO

--ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_Doctor_ReferringDoctorId] FOREIGN KEY([ReferringDoctorId])
--	REFERENCES [dbo].[Doctor] ([Id])
--GO

--ALTER TABLE [dbo].[Referral] CHECK CONSTRAINT [FK_Referral_Doctor_ReferringDoctorId]
--GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_Company_ReferredToCompanyId] FOREIGN KEY([ReferredToCompanyId])
	REFERENCES [dbo].[Company] ([Id])
GO

ALTER TABLE [dbo].[Referral] CHECK CONSTRAINT [FK_Referral_Company_ReferredToCompanyId]
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_Location_ReferredToLocationId] FOREIGN KEY([ReferredToLocationId])
	REFERENCES [dbo].[Location] ([Id])
GO

ALTER TABLE [dbo].[Referral] CHECK CONSTRAINT [FK_Referral_Location_ReferredToLocationId]
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_Doctor_ReferredToDoctorId] FOREIGN KEY([ReferredToDoctorId])
	REFERENCES [dbo].[Doctor] ([Id])
GO

ALTER TABLE [dbo].[Referral] CHECK CONSTRAINT [FK_Referral_Doctor_ReferredToDoctorId]
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_Room_ReferredToRoomId] FOREIGN KEY([ReferredToRoomId])
	REFERENCES [dbo].[Room] ([Id])
GO

ALTER TABLE [dbo].[Referral] CHECK CONSTRAINT [FK_Referral_Room_ReferredToRoomId]
GO

/*
ALTER TABLE [dbo].[Referral] ADD [ReferringUserId] INT NULL
GO

ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_User_ReferringUserId] FOREIGN KEY([ReferringUserId])
	REFERENCES [dbo].[User] ([Id])
GO

ALTER TABLE [dbo].[Referral] CHECK CONSTRAINT [FK_Referral_User_ReferringUserId]
GO

UPDATE [dbo].[Referral] SET [ReferringUserId] = [ReferringDoctorId]
GO

ALTER TABLE [dbo].[Referral] DROP CONSTRAINT [FK_Referral_Doctor_ReferringDoctorId]
GO

ALTER TABLE [dbo].[Referral] DROP COLUMN [ReferringDoctorId]
GO

ALTER TABLE [dbo].[Referral] ALTER COLUMN [ReferringUserId] INT NOT NULL
GO
*/

/*
ALTER TABLE [dbo].[Referral] ADD [ReferredToSpecialtyId] INT NULL
GO

ALTER TABLE [dbo].[Referral] ADD [ReferredToRoomTestId] INT NULL
GO
*/
