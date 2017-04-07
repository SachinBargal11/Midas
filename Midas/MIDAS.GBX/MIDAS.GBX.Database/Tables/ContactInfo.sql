CREATE TABLE [dbo].[ContactInfo](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[CellPhone] [nvarchar](50) NULL,
	[EmailAddress] [nvarchar](200) NULL,
	[HomePhone] [nvarchar](50) NULL,
	[WorkPhone] [nvarchar](50) NULL,
	[FaxNo] [nvarchar](50) NULL,
	[OfficeExtension] [VARCHAR](20) NULL,
	[AlternateEmail] [NVARCHAR](100) NULL,
	[PreferredCommunication] [tinyint] NULL,
	[IsDeleted] [bit] NULL CONSTRAINT [DF_ContactInfo_IsDeleted]  DEFAULT ((0)),
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
 CONSTRAINT [PK_ContactInfo] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

/*
ALTER TABLE [dbo].[CONTACTINFO] ADD [OfficeExtension] [VARCHAR](20)
GO
ALTER TABLE [dbo].[CONTACTINFO] ADD [AlternateEmail] [NVARCHAR](100)
GO
ALTER TABLE [dbo].[CONTACTINFO] ADD [PreferredCommunication] [tinyint]
GO
*/
