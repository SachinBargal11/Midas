CREATE TABLE [dbo].[Doctor](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[LicenseNumber] [nvarchar](50) NULL,
	[WCBAuthorization] [nvarchar](50) NULL,
	[WcbRatingCode] [nvarchar](50) NULL,
	[NPI] [nvarchar](50) NULL,
	--[TaxType] [tinyint] NULL,
    [TaxTypeId] [TINYINT] NULL,
	[Title] [nvarchar](10) NULL,
	[IsCalendarPublic] [BIT] NOT NULL,
	[IsDeleted] [bit] NULL CONSTRAINT [DF_Doctor_IsDeleted] DEFAULT ((0)),
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
	[UserID] [int] NULL,
 CONSTRAINT [PK__Doctor__3214EC274F0D6139] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Doctor]  WITH CHECK ADD  CONSTRAINT [FK_Doctor_User] FOREIGN KEY([UserID])
    REFERENCES [dbo].[User] ([id])
GO

ALTER TABLE [dbo].[Doctor] CHECK CONSTRAINT [FK_Doctor_User]
GO
/*
ALTER TABLE [dbo].[Doctor] ADD [IsCalendarPublic] [BIT] NULL
GO
UPDATE [dbo].[Doctor] SET [IsCalendarPublic] = 1
GO
ALTER TABLE [dbo].[Doctor] ALTER COLUMN [IsCalendarPublic] [BIT] NOT NULL
GO
*/

/*
ALTER TABLE [dbo].[Doctor] ADD [TaxTypeId] [TINYINT] NULL
GO
UPDATE [dbo].[Doctor] SET [TaxTypeId] = [TaxType]
GO
ALTER TABLE [dbo].[Doctor] DROP COLUMN [TaxType]
GO
*/
ALTER TABLE [dbo].[Doctor]  WITH CHECK ADD  CONSTRAINT [FK_Doctor_DoctorTaxType_TaxTypeId] FOREIGN KEY([TaxTypeId])
REFERENCES [dbo].[DoctorTaxType] ([Id])
GO

ALTER TABLE [dbo].[Doctor] CHECK CONSTRAINT [FK_Doctor_DoctorTaxType_TaxTypeId]
GO

