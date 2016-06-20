CREATE TABLE [dbo].[Abbreviation]
(
	[AbbreviationId] INT identity(1,1) NOT NULL PRIMARY KEY,
	[Name] nvarchar(25) not null,
	[Description] nvarchar(100)
)
