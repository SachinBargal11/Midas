CREATE TABLE [dbo].[AddressInfo](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Address1] [nvarchar](200) NULL,
	[Address2] [nvarchar](200) NULL,
	[City] [nvarchar](50) NULL,
	[State] [nvarchar](50) NULL,
	[ZipCode] [nvarchar](10) NULL,
	[Country] [nvarchar](50) NULL,
	[IsDeleted] [bit] NULL CONSTRAINT [DF_AddressInfo_IsDeleted]  DEFAULT ((0)),
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
	[StateCode] [nvarchar](2) NULL,
 CONSTRAINT [PK_AddressInfo] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


GO
--ALTER [dbo].[AddressInfo] ADD [StateCode] [nvarchar](2) NULL
ALTER TABLE [dbo].[AddressInfo]  WITH CHECK ADD  CONSTRAINT [FK_AddressInfo_State_StateCode] FOREIGN KEY([StateCode])
	REFERENCES [dbo].[State] ([StateCode])
GO

ALTER TABLE [dbo].[AddressInfo] CHECK CONSTRAINT [FK_AddressInfo_State_StateCode]
GO

-- ALTER TABLE [dbo].[AddressInfo]
--ADD FOREIGN KEY (StateCode)
--REFERENCES [dbo].[State](StateCode)

--GO

--ALTER TABLE [dbo].[AddressInfo] ALTER COLUMN [Country] [nvarchar](50) NULL
--GO
