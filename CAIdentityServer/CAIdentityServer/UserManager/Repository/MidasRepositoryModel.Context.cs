﻿

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------


namespace UserManager.Repository
{

using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;


public partial class MIDASGBXEntities : DbContext
{
    public MIDASGBXEntities()
        : base("name=MIDASGBXEntities")
    {

    }

    protected override void OnModelCreating(DbModelBuilder modelBuilder)
    {
        throw new UnintentionalCodeFirstException();
    }


    public virtual DbSet<Company> Companies { get; set; }

    public virtual DbSet<CompanyStatusType> CompanyStatusTypes { get; set; }

    public virtual DbSet<CompanyType> CompanyTypes { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserApiRoleMapping> UserApiRoleMappings { get; set; }

    public virtual DbSet<UserCompany> UserCompanies { get; set; }

    public virtual DbSet<UserCompanyRole> UserCompanyRoles { get; set; }

    public virtual DbSet<UserStatus> UserStatus1 { get; set; }

    public virtual DbSet<UserType> UserTypes { get; set; }

    public virtual DbSet<OTP> OTPs { get; set; }

}

}
