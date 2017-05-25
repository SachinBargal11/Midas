CREATE TABLE [dbo].[ConsentGivenType]
(
	[Id] TINYINT NOT NULL,
	[TypeText] [NVARCHAR](50) NOT NULL,
	[TypeDescription] [NVARCHAR](200) NULL,
	CONSTRAINT [PK_ConsentGivenType] PRIMARY KEY ([Id])
)
GO

/*
INSERT INTO [dbo].[ConsentGivenType] ([Id], [TypeText], [TypeDescription]) 
	VALUES (1, 'Uploaded', NULL), (2, 'Sacanned', NULL), (3, 'Digitally Signed', NULL), (4, 'Accepted from patient portal', NULL)
*/
