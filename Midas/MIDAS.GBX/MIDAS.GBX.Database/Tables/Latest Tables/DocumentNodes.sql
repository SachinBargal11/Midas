
CREATE TABLE [dbo].[DocumentNodes](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ParentNode] [nvarchar](10) NULL,
	[ChildNode] [nvarchar](10) NOT NULL,
	[NodeAbbr] [varchar](10) NULL
) ON [PRIMARY]

GO