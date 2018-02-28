CREATE TABLE [dbo].[Invitation](
	[InvitationID] [int] IDENTITY(1,1) NOT NULL,
	[CompanyID] [int] NOT NULL,
	[UserID] [int] NOT NULL,
	[UniqueID] [uniqueidentifier] NOT NULL,
	[IsExpired] [bit] NULL,
	[IsActivated] [bit] NOT NULL,
	[IsDeleted] [bit] NULL CONSTRAINT [DF_Invitation_IsDeleted]  DEFAULT ((0)),
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
 CONSTRAINT [PK_Invitation] PRIMARY KEY CLUSTERED 
(
	[InvitationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Invitation]  WITH CHECK ADD  CONSTRAINT [FK_Invitation_Company] FOREIGN KEY([CompanyID])
REFERENCES [dbo].[Company] ([id])
GO

ALTER TABLE [dbo].[Invitation] CHECK CONSTRAINT [FK_Invitation_Company]
GO

ALTER TABLE [dbo].[Invitation]  WITH CHECK ADD  CONSTRAINT [FK_Invitation_User_Invitation] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([id])
GO

ALTER TABLE [dbo].[Invitation] CHECK CONSTRAINT [FK_Invitation_User_Invitation]
GO