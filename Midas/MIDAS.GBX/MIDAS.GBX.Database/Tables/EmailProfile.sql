CREATE TABLE [dbo].[EmailProfile](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ProfileName] [varchar](20) NULL,
	[SMTPServer] [varchar](50) NULL,
	[SMTPPort] [int] NULL,
	[SSLEnabled] [bit] NULL,
	[AuthenticationUsername] [varchar](50) NULL,
	[Password] [varchar](50) NULL,
	[SMTPAuthenticationRequired] [bit] NOT NULL,
	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
 CONSTRAINT [PK_EmailProfile] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]