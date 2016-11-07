CREATE TABLE [dbo].[PasswordToken](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](200) NOT NULL,
	[TokenHash] [uniqueidentifier] NOT NULL,
	[IsTokenUsed] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
 CONSTRAINT [PK_PasswordToken] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO