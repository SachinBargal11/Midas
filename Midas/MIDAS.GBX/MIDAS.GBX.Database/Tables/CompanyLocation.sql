CREATE TABLE [dbo].[CompanyLocation](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[CompanyID] [int] NOT NULL,
	[LocationID] [int] NOT NULL,
	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
 CONSTRAINT [PK_CompanyLocation] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[CompanyLocation]  WITH CHECK ADD  CONSTRAINT [FK_CompanyLocation_Company] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[Company] ([id])
GO

ALTER TABLE [dbo].[CompanyLocation] CHECK CONSTRAINT [FK_CompanyLocation_Company]
GO

ALTER TABLE [dbo].[CompanyLocation]  WITH CHECK ADD  CONSTRAINT [FK_CompanyLocation_Location] FOREIGN KEY([LocationID])
REFERENCES [dbo].[Location] ([id])
GO

ALTER TABLE [dbo].[CompanyLocation] CHECK CONSTRAINT [FK_CompanyLocation_Location]
GO
