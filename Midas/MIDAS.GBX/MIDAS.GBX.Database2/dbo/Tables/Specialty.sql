CREATE TABLE [dbo].[Specialty] (
    [id]                  INT           IDENTITY (1, 1) NOT NULL,
    [Name]                NVARCHAR (50) NOT NULL,
    [SpecialityCode]      NVARCHAR (50) NOT NULL,
    [IsUnitApply]         BIT           NULL,
    [IsDeleted]           BIT           CONSTRAINT [DF_Specialty_IsDeleted] DEFAULT ((0)) NULL,
    [CreateByUserID]      INT           NOT NULL,
    [CreateDate]          DATETIME2 (7) NULL,
    [UpdateByUserID]      INT           NULL,
    [UpdateDate]          DATETIME2 (7) NULL,
    [ColorCode]           NVARCHAR (20) NULL,
    [MandatoryProcCode]   BIT           CONSTRAINT [DF_Specialty_MandatoryProcCode] DEFAULT ((0)) NOT NULL,
    [SchedulingAvailable] BIT           CONSTRAINT [DF_Specialty_SchedulingAvailable] DEFAULT ((1)) NOT NULL,
    PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_Specialty_Specialty] FOREIGN KEY ([id]) REFERENCES [dbo].[Specialty] ([id])
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_SpecialtyName]
    ON [dbo].[Specialty]([id] ASC);

