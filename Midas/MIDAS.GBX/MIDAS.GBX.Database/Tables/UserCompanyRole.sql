﻿CREATE TABLE [dbo].[UserCompanyRole](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[RoleID] [int] NOT NULL,
	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
 CONSTRAINT [PK_UserCompanyRole] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[UserCompanyRole]  WITH CHECK ADD  CONSTRAINT [FK_UserCompanyRole_Role] FOREIGN KEY([RoleID])
REFERENCES [dbo].[Role] ([id])
GO

ALTER TABLE [dbo].[UserCompanyRole] CHECK CONSTRAINT [FK_UserCompanyRole_Role]
GO

ALTER TABLE [dbo].[UserCompanyRole]  WITH CHECK ADD  CONSTRAINT [FK_UserCompanyRole_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([id])
GO

ALTER TABLE [dbo].[UserCompanyRole] CHECK CONSTRAINT [FK_UserCompanyRole_User]
GO
