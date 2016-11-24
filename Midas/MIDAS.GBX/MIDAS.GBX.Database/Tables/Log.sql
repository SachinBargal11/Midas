CREATE TABLE [dbo].[Log](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[RequestID] [nvarchar](200) NOT NULL,
	[ResponseID] [nvarchar](200) NOT NULL,
	[IpAddress] [nvarchar](15) NOT NULL,
	[Country] [nvarchar](50) NOT NULL,
	[MachineName] [nvarchar](50) NOT NULL,
	[UserID] [int] NOT NULL,
	[RequestURL] [nvarchar](200) NOT NULL,
	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
 CONSTRAINT [PK_Log] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

