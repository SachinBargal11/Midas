CREATE TABLE [dbo].[Schedule](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[CompanyId] [INT] NOT NULL,
	[IsDeleted] [bit] NULL CONSTRAINT [DF_Schedule_IsDeleted]  DEFAULT ((0)),
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[IsDefault] [bit] NOT NULL,
	[UpdateDate] [datetime2](7) NULL,
	CONSTRAINT [PK_Schedule] PRIMARY KEY ([Id])
)
GO

/*
ALTER TABLE [dbo].[Schedule] ADD [CompanyId] [INT] NULL
GO
*/
ALTER TABLE [dbo].[Schedule]  WITH CHECK ADD  CONSTRAINT [FK_Schedule_Company_CompanyId] FOREIGN KEY([CompanyId])
	REFERENCES [dbo].[Company] ([Id])
GO

ALTER TABLE [dbo].[Schedule] CHECK CONSTRAINT [FK_Schedule_Company_CompanyId]
GO
