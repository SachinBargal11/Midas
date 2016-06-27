CREATE TABLE [dbo].[RoleEvents]
(
RoleEventID INT identity(1,1),
RoleEventName varchar(20),
IsActive bit,
[CreatedDate] datetime,
[UpdatedDate] datetime,
[CreatedBy] int,
[UpdatedBY]  int,
IPAddress varchar(15)
)
