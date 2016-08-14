CREATE TABLE [dbo].[EmployerAddress](
	[ID] [INT] IDENTITY(1,1) NOT NULL,
	[EmployerID] [INT] NULL,
	[AddressID] [INT] NULL,
	[ContactinfoID] [INT] NULL,
	[IsDeleted] [BIT] NULL,
	[CreateByUserID] [INT] NOT NULL,
	[CreateDate] [DATETIME] NULL,
	[UpdateByUserID] [INT] NULL,
	[UpdateDate] [DATETIME] NULL,
 CONSTRAINT [PK_EmployerAddress] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[EmployerAddress]  WITH CHECK ADD  CONSTRAINT [FK_EmployerAddress_Addresses] FOREIGN KEY([AddressID])
REFERENCES [dbo].[Addresses] ([ID])
GO

ALTER TABLE [dbo].[EmployerAddress] CHECK CONSTRAINT [FK_EmployerAddress_Addresses]
GO

ALTER TABLE [dbo].[EmployerAddress]  WITH CHECK ADD  CONSTRAINT [FK_EmployerAddress_ContactInfo] FOREIGN KEY([ContactinfoID])
REFERENCES [dbo].[ContactInfo] ([ID])
GO

ALTER TABLE [dbo].[EmployerAddress] CHECK CONSTRAINT [FK_EmployerAddress_ContactInfo]
GO

ALTER TABLE [dbo].[EmployerAddress]  WITH CHECK ADD  CONSTRAINT [FK_EmployerAddress_User] FOREIGN KEY([EmployerID])
REFERENCES [dbo].[Employer] ([ID])
GO

ALTER TABLE [dbo].[EmployerAddress] CHECK CONSTRAINT [FK_EmployerAddress_User]
GO

ALTER TABLE [dbo].[EmployerAddress]  WITH CHECK ADD  CONSTRAINT [FK_EmployerAddress_User1] FOREIGN KEY([UpdateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[EmployerAddress] CHECK CONSTRAINT [FK_EmployerAddress_User1]
GO


