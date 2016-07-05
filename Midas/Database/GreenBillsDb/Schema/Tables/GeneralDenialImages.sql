
create table GeneralDenialImages
(
GeneralDenialsImageId int  identity(1,1),
GeneralDenialsId int,
[FileName] nvarchar (200),
FilePath nvarchar(2000), 
ImageId int,
[Deleted] bit,
[CreatedDate] datetime,
[UpdatedDate] datetime,
[CreatedBy] int,
[UpdatedBY]  int
)
