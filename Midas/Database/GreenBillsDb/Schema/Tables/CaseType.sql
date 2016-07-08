
CREATE TABLE [dbo].[CaseType](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[AbbreviationId] [int] NULL,
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

ALTER TABLE [dbo].[CaseType]  WITH CHECK ADD  CONSTRAINT [FK_CaseType_Abbreviation] FOREIGN KEY([AbbreviationId])
REFERENCES [dbo].[Abbreviation] ([ID])
GO

ALTER TABLE [dbo].[CaseType] CHECK CONSTRAINT [FK_CaseType_Abbreviation]
GO


