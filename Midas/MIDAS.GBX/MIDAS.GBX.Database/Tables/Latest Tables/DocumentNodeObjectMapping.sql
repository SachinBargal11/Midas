CREATE TABLE [dbo].[DocumentNodeObjectMapping](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ObjectType] [nvarchar](10) NULL,
	[ChildNode] [nvarchar](10) NOT NULL,
	[companyid] [int] NULL
) ON [PRIMARY]
GO

/*
ALTER TABLE [dbo].[DocumentNodeObjectMapping]  WITH CHECK ADD  CONSTRAINT [FK_DocumentNodeObjectMapping_Company] FOREIGN KEY([companyid])
REFERENCES [dbo].[Company] ([id])
GO

ALTER TABLE [dbo].[DocumentNodeObjectMapping] CHECK CONSTRAINT [FK_DocumentNodeObjectMapping_Company]
GO
*/

--ALTER TABLE [MIDASGBXDEV].[dbo].[DocumentNodeObjectMapping]
--ALTER COLUMN ChildNode NVARCHAR(50) not null;

