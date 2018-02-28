CREATE TABLE [dbo].[MailTemplates] (
    [TemplateID]   INT            IDENTITY (1, 1) NOT NULL,
    [TemplateName] NVARCHAR (50)  NULL,
    [EmailSubject] NVARCHAR (50)  NULL,
    [EmailBody]    NVARCHAR (500) NULL,
    CONSTRAINT [PK_MailTemplates] PRIMARY KEY CLUSTERED ([TemplateID] ASC)
);

