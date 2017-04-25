CREATE TABLE [dbo].[Attorney]
(
	[Id] [INT] NOT NULL,
	--[CompanyId] [INT] NULL,

	[IsDeleted] [BIT] NULL,
	[CreateByUserID] [INT] NOT NULL,
	[CreateDate] [DATETIME2](7) NOT NULL,
	[UpdateByUserID] [INT] NULL,
	[UpdateDate] [DATETIME2](7) NULL,

	CONSTRAINT [PK_AttorneyMaster] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[Attorney]  WITH CHECK ADD  CONSTRAINT [FK_Attorney_User_id] FOREIGN KEY([Id])
	REFERENCES [dbo].[User] ([Id])
GO

ALTER TABLE [dbo].[Attorney] CHECK CONSTRAINT [FK_Attorney_User_id]
GO

--ALTER TABLE [dbo].[Attorney]  WITH CHECK ADD  CONSTRAINT [FK_Attorney_Company_CompanyId] FOREIGN KEY([CompanyId])
--	REFERENCES [dbo].[Company] ([Id])
--GO

--ALTER TABLE [dbo].[Attorney] CHECK CONSTRAINT [FK_Attorney_Company_CompanyId]
--GO
/*
ALTER TABLE [dbo].[Attorney] DROP CONSTRAINT [FK_Attorney_Company_CompanyId]
GO

ALTER TABLE [dbo].[Attorney] DROP COLUMN [CompanyId]
GO
*/
