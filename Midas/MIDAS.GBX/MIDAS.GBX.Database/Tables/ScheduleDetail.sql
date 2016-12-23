CREATE TABLE [dbo].[ScheduleDetail](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[ScheduleID] [int] NOT NULL,
	[DayOfWeek] [int] NOT NULL,
	[SlotStart] [time](7) NOT NULL,
	[SlotEnd] [time](7) NOT NULL,
	[SlotDate] [datetime2](7) NULL,
	[Status] [tinyint] NOT NULL,
	[IsDeleted] [bit] NULL CONSTRAINT [DF_ScheduleDetail_IsDeleted]  DEFAULT ((0)),
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
 CONSTRAINT [PK_ScheduleDetail] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[ScheduleDetail]  WITH CHECK ADD  CONSTRAINT [FK_ScheduleDetail_Schedule] FOREIGN KEY([ScheduleID])
REFERENCES [dbo].[Schedule] ([id])
GO

ALTER TABLE [dbo].[ScheduleDetail] CHECK CONSTRAINT [FK_ScheduleDetail_Schedule]
GO