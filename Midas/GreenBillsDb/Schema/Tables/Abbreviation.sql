
CREATE TABLE [dbo].[Abbreviation](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](25) NOT NULL,
	[Description] [nvarchar](100) NULL,
	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime] NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


