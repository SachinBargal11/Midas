CREATE TABLE [dbo].[City]
(
	[Id] [TINYINT] NOT NULL,
	--[StateCode] [NVARCHAR](2) NOT NULL,
	[StateCode] [NVARCHAR](2) NULL,
	[CityText] [NVARCHAR](50) NOT NULL,
	[IsDeleted] [BIT] NULL,
	--[CreateByUserID] [INT] NOT NULL,
	--[CreateDate] [DATETIME2](7) NOT NULL,
	--[UpdateByUserID] [INT] NULL,
	--[UpdateDate] [DATETIME2](7) NULL,
	--CONSTRAINT [UK_State_City] UNIQUE ([StateCode], [CityText]),
    CONSTRAINT [PK_City] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[City]  WITH CHECK ADD  CONSTRAINT [FK_City_StateCode] FOREIGN KEY([StateCode])
REFERENCES [dbo].[State] ([StateCode])
GO

ALTER TABLE [dbo].[City] CHECK CONSTRAINT [FK_City_StateCode]
GO
