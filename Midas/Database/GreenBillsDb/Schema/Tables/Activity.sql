CREATE TABLE [dbo].[Activity]
(
ActivtyID INT identity(1,1),
ActivityName varchar(20),
ActivityURL varchar(100),
FileSystemPath varchar(200),
[Deleted] bit,
[CreatedDate] datetime,
[UpdatedDate] datetime,
[CreatedBy] int,
[UpdatedBY]  int

)
