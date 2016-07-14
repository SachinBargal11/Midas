
CREATE TABLE [dbo].[InsuranceAddress](
	[ID] [INT] NOT NULL,
	[InsuranceId] [INT] NULL,
	[AddressID] [INT] NULL,
	[ContactinfoID] [INT] NULL,
	[Default] [BIT] NULL,
	[IsDeleted] [BIT] NULL,
	[CreateByUserID] [INT] NOT NULL,
	[CreateDate] [DATETIME] NULL,
	[UpdateByUserID] [INT] NULL,
	[UpdateDate] [DATETIME] NULL,
 CONSTRAINT [PK__Insuranc__3214EC27C5591BD2] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[InsuranceAddress]  WITH CHECK ADD  CONSTRAINT [FK_InsuranceAddress_ContactInfo] FOREIGN KEY([ContactinfoID])
REFERENCES [dbo].[ContactInfo] ([ID])
GO

ALTER TABLE [dbo].[InsuranceAddress] CHECK CONSTRAINT [FK_InsuranceAddress_ContactInfo]
GO

ALTER TABLE [dbo].[InsuranceAddress]  WITH CHECK ADD  CONSTRAINT [FK_InsuranceAddress_InsuranceAddress] FOREIGN KEY([AddressID])
REFERENCES [dbo].[Address] ([ID])
GO

ALTER TABLE [dbo].[InsuranceAddress] CHECK CONSTRAINT [FK_InsuranceAddress_InsuranceAddress]
GO

ALTER TABLE [dbo].[InsuranceAddress]  WITH CHECK ADD  CONSTRAINT [FK_InsuranceAddress_User] FOREIGN KEY([CreateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[InsuranceAddress] CHECK CONSTRAINT [FK_InsuranceAddress_User]
GO

ALTER TABLE [dbo].[InsuranceAddress]  WITH CHECK ADD  CONSTRAINT [FK_InsuranceAddress_User1] FOREIGN KEY([UpdateByUserID])
REFERENCES [dbo].[User] ([ID])
GO

ALTER TABLE [dbo].[InsuranceAddress] CHECK CONSTRAINT [FK_InsuranceAddress_User1]
GO

