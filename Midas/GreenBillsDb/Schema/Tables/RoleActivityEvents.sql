CREATE TABLE [dbo].[RoleActivityEvents]
(
RoleActivityEventsID INT identity(1,1),
RoleID INT,
ActivityID int,
EventsIDs Varchar(100),
[Deleted] bit,
[CreatedDate] datetime,
[UpdatedDate] datetime,
[CreatedBy] int,
[UpdatedBY]  int,
IPAddress varchar(15)
)
