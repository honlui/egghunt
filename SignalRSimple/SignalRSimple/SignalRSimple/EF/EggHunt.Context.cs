﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SignalRSimple.EF
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class EggHuntEntities : DbContext
    {
        public EggHuntEntities()
            : base("name=EggHuntEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Count> Counts { get; set; }
        public virtual DbSet<Login> Logins { get; set; }
    
        public virtual int decrement(string groupName)
        {
            var groupNameParameter = groupName != null ?
                new ObjectParameter("GroupName", groupName) :
                new ObjectParameter("GroupName", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("decrement", groupNameParameter);
        }
    
        public virtual int Increment(string groupName)
        {
            var groupNameParameter = groupName != null ?
                new ObjectParameter("GroupName", groupName) :
                new ObjectParameter("GroupName", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("Increment", groupNameParameter);
        }
    }
}