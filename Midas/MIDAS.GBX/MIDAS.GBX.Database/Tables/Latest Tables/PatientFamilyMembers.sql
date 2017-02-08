CREATE TABLE [dbo].[PatientFamilyMembers]
(
	[Id] INT NOT NULL IDENTITY(1,1),
	[PatientId] INT NOT NULL,
	[RelationId] TINYINT NOT NULL, 
	[FullName] [NVARCHAR](50) NOT NULL, 
	[FamilyName] NVARCHAR(50) NULL, 
    [Prefix] NVARCHAR(10) NULL,  
	[Sufix] NVARCHAR(10) NULL, 
	[Age] TINYINT NOT NULL, 
    [RaceId] TINYINT NULL, 
	[EthnicitesId] TINYINT NULL, 
    [GenderId] TINYINT NOT NULL, 
	[CellPhone] NVARCHAR(50) NULL , 
	[WorkPhone] NVARCHAR(50) NULL,
	[PrimaryContact] BIT NULL DEFAULT 0, 
	[IsInActive] [BIT] NUll DEFAULT (0),

	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
	CONSTRAINT [PK_PatientFamilyMembers] PRIMARY KEY ([Id])
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[PatientFamilyMembers]  WITH CHECK ADD  CONSTRAINT [FK_PatientFamilyMembers_Patient2_PatientId] FOREIGN KEY([PatientId])
	REFERENCES [dbo].[Patient2] ([Id])
GO

ALTER TABLE [dbo].[PatientFamilyMembers] CHECK CONSTRAINT [FK_PatientFamilyMembers_Patient2_PatientId]
GO

ALTER TABLE [dbo].[PatientFamilyMembers]  WITH CHECK ADD  CONSTRAINT [FK_PatientFamilyMembers_Relations_RelationId] FOREIGN KEY([RelationId])
	REFERENCES [dbo].[Relations] ([Id])
GO

ALTER TABLE [dbo].[PatientFamilyMembers] CHECK CONSTRAINT [FK_PatientFamilyMembers_Relations_RelationId]
GO

ALTER TABLE [dbo].[PatientFamilyMembers]  WITH CHECK ADD  CONSTRAINT [FK_PatientFamilyMembers_Gender_GenderId] FOREIGN KEY([GenderId])
	REFERENCES [dbo].[Gender] ([Id])
GO

ALTER TABLE [dbo].[PatientFamilyMembers] CHECK CONSTRAINT [FK_PatientFamilyMembers_Gender_GenderId]
GO