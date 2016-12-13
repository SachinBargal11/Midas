CREATE TABLE [dbo].[DoctorLocationSchedule](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[LocationID] [int] NOT NULL,
	[ScheduleID] [int] NOT NULL,
	[DoctorID] [int] NOT NULL,
	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
 CONSTRAINT [PK_DoctorLocationSchedule] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[DoctorLocationSchedule]  WITH CHECK ADD  CONSTRAINT [FK_DoctorLocationSchedule_Doctor] FOREIGN KEY([LocationID])
REFERENCES [dbo].[Location] ([id])
GO

ALTER TABLE [dbo].[DoctorLocationSchedule] CHECK CONSTRAINT [FK_DoctorLocationSchedule_Doctor]
GO

ALTER TABLE [dbo].[DoctorLocationSchedule]  WITH CHECK ADD  CONSTRAINT [FK_DoctorLocationSchedule_Doctor1] FOREIGN KEY([DoctorID])
REFERENCES [dbo].[Doctor] ([id])
GO

ALTER TABLE [dbo].[DoctorLocationSchedule] CHECK CONSTRAINT [FK_DoctorLocationSchedule_Doctor1]
GO

ALTER TABLE [dbo].[DoctorLocationSchedule]  WITH CHECK ADD  CONSTRAINT [FK_DoctorLocationSchedule_Schedule] FOREIGN KEY([ScheduleID])
REFERENCES [dbo].[Schedule] ([id])
GO

ALTER TABLE [dbo].[DoctorLocationSchedule] CHECK CONSTRAINT [FK_DoctorLocationSchedule_Schedule]
GO