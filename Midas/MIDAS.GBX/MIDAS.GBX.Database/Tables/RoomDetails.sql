CREATE TABLE [dbo].[RoomDetails](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[RoomID] [int] NOT NULL,
	[LocationID] [int] NOT NULL,
	[SpecilityID] [int] NOT NULL,
	[ContactPerson] [nvarchar](50) NOT NULL,
	[Email] [nvarchar](200) NOT NULL,
	[Phone] [nvarchar](50) NULL,
	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
 CONSTRAINT [PK_RoomDetails] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[RoomDetails]  WITH CHECK ADD  CONSTRAINT [FK_RoomDetails_Location] FOREIGN KEY([LocationID])
REFERENCES [dbo].[Location] ([id])
GO

ALTER TABLE [dbo].[RoomDetails] CHECK CONSTRAINT [FK_RoomDetails_Location]
GO

ALTER TABLE [dbo].[RoomDetails]  WITH CHECK ADD  CONSTRAINT [FK_RoomDetails_Room] FOREIGN KEY([RoomID])
REFERENCES [dbo].[Room] ([id])
GO

ALTER TABLE [dbo].[RoomDetails] CHECK CONSTRAINT [FK_RoomDetails_Room]
GO

ALTER TABLE [dbo].[RoomDetails]  WITH CHECK ADD  CONSTRAINT [FK_RoomDetails_Specialty] FOREIGN KEY([SpecilityID])
REFERENCES [dbo].[Specialty] ([id])
GO

ALTER TABLE [dbo].[RoomDetails] CHECK CONSTRAINT [FK_RoomDetails_Specialty]
GO