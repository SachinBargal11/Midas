
CREATE TABLE [dbo].[Location](
	[id] [int] NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[ContactPersonName] [nvarchar](100) NOT NULL,
	[AddressInfoID] [int] NOT NULL,
	[ContactInfoID] [int] NOT NULL,
	[LocationType] [tinyint] NOT NULL,
	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
 CONSTRAINT [PK_Location] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Location]  WITH CHECK ADD  CONSTRAINT [FK_Location_AddressInfo] FOREIGN KEY([AddressInfoID])
REFERENCES [dbo].[AddressInfo] ([id])
GO

ALTER TABLE [dbo].[Location] CHECK CONSTRAINT [FK_Location_AddressInfo]
GO

ALTER TABLE [dbo].[Location]  WITH CHECK ADD  CONSTRAINT [FK_Location_ContactInfo] FOREIGN KEY([ContactInfoID])
REFERENCES [dbo].[ContactInfo] ([id])
GO

ALTER TABLE [dbo].[Location] CHECK CONSTRAINT [FK_Location_ContactInfo]
GO