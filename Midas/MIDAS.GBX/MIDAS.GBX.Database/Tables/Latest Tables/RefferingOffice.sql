CREATE TABLE [dbo].[RefferingOffice]
(
	[Id] [INT] NOT NULL IDENTITY(1,1),
	--[PatientId] [INT] NOT NULL,
	[CaseId] [INT] NOT NULL,
	[RefferingOfficeId] [TINYINT] NULL, 
    [AddressInfoId] [INT] NULL, 
    [ReffferingDoctorId] [TINYINT] NULL, 
    [NPI] [NVARCHAR](50) NULL,
	--[IsCurrentReffOffice] [BIT] NOT NULL DEFAULT 0, 

	[IsDeleted] [bit] NULL DEFAULT (0),
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL, 
	CONSTRAINT [PK_RefferingOffice] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[RefferingOffice]  WITH CHECK ADD  CONSTRAINT [FK_RefferingOffice_Case_CaseId] FOREIGN KEY([CaseId])
	REFERENCES [dbo].[Case] ([Id])
GO

ALTER TABLE [dbo].[RefferingOffice] CHECK CONSTRAINT [FK_RefferingOffice_Case_CaseId]
GO

ALTER TABLE [dbo].[RefferingOffice]  WITH CHECK ADD  CONSTRAINT [FK_RefferingOffice_AddressInfo_AddressInfoId] FOREIGN KEY([AddressInfoId])
	REFERENCES [dbo].[AddressInfo] ([Id])
GO

ALTER TABLE [dbo].[RefferingOffice] CHECK CONSTRAINT [FK_RefferingOffice_AddressInfo_AddressInfoId]
GO