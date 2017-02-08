CREATE TABLE [dbo].[RefferingOffice]
(
	[Id] [INT] NOT NULL IDENTITY(1,1),
	[PatientId] [INT] NOT NULL,
	[RefferingOfficeId] [TINYINT] NULL, 
    [AddressInfoId] [INT] NULL, 
    [ReffferingDoctorId] [TINYINT] NULL, 
    [NPI] [NVARCHAR](50) NULL,
	[IsCurrentReffOffice] [BIT] NOT NULL DEFAULT 0, 

	[IsDeleted] [bit] NULL DEFAULT (0),
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL, 
	CONSTRAINT [PK_RefferingOffice] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[RefferingOffice]  WITH CHECK ADD  CONSTRAINT [FK_RefferingOffice_Patient2_PatientId] FOREIGN KEY([PatientId])
	REFERENCES [dbo].[Patient2] ([id])
GO

ALTER TABLE [dbo].[RefferingOffice] CHECK CONSTRAINT [FK_RefferingOffice_Patient2_PatientId]
GO

ALTER TABLE [dbo].[RefferingOffice]  WITH CHECK ADD  CONSTRAINT [FK_RefferingOffice_AddressInfo_AddressInfoId] FOREIGN KEY([AddressInfoId])
	REFERENCES [dbo].[AddressInfo] ([id])
GO

ALTER TABLE [dbo].[RefferingOffice] CHECK CONSTRAINT [FK_RefferingOffice_AddressInfo_AddressInfoId]
GO