CREATE TABLE [dbo].[RefferPatient]
(
	[Id] INT NOT NULL,
	[PatientId] INT NOT NULL, 
    [CaseId] INT NOT NULL, 
    CONSTRAINT [PK_RefferPatient] PRIMARY KEY ([Id])
)
