CREATE TABLE [dbo].[City] (
    [Id]        TINYINT       NOT NULL,
    [StateCode] NVARCHAR (2)  NOT NULL,
    [CityText]  NVARCHAR (50) NOT NULL,
    [IsDeleted] BIT           NULL,
    CONSTRAINT [PK_City] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_City_StateCode] FOREIGN KEY ([StateCode]) REFERENCES [dbo].[State] ([StateCode]),
    CONSTRAINT [UK_State_City] UNIQUE NONCLUSTERED ([StateCode] ASC, [CityText] ASC)
);

