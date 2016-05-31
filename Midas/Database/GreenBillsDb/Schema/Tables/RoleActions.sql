CREATE TABLE [dbo].[RoleActions]
(
	[RoleId] INT NOT NULL ,
	[ActionId] INT NOT NULL ,
	CONSTRAINT PK_RoleActions PRIMARY KEY  (RoleId,ActionId) 
)
