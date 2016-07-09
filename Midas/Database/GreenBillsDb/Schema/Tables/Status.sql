CREATE TABLE [dbo].[Status](
	[ID] [nchar](10) NULL,
	[Status] [varchar](20) NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime] NULL,
) ON [PRIMARY]

GO


