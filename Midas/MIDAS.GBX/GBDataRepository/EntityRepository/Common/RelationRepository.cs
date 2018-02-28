using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MIDAS.GBX.EntityRepository;
using System.Data.Entity;
using MIDAS.GBX.DataRepository.Model;
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.DataRepository.EntityRepository.Common
{
    internal class RelationRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<Relation> _dbState;

        public RelationRepository(MIDASGBXEntities context) : base(context)
        {
            _dbState = context.Set<Relation>();
        }

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            List<Relation> relations = entity as List<Relation>;
            if (relations == null)
                return default(T);

            List<BO.Common.Relation> boRelation = new List<BO.Common.Relation>();
            foreach (var eachRelation in relations)
            {
                BO.Common.Relation boEachRelation = new BO.Common.Relation();

                boEachRelation.ID = eachRelation.Id;
                boEachRelation.RelationText = eachRelation.RelationText;
                boEachRelation.IsDeleted = eachRelation.IsDeleted;

                boRelation.Add(boEachRelation);
            }


            return (T)(object)boRelation;
        }
        #endregion

        #region Entity Conversion
        public override T ObjectConvert<T, U>(U entity)
        {
            Relation relation = entity as Relation;

            if (relation == null)
                return default(T);

            BO.Common.Relation boRelation = new BO.Common.Relation();

            boRelation.ID = relation.Id;
            boRelation.RelationText = relation.RelationText;
            boRelation.IsDeleted = relation.IsDeleted;

            return (T)(object)boRelation;
        }
        #endregion

        #region Get All Insurance Type
        public override Object Get()
        {
            var acc = _context.Relations.Where(p => p.IsDeleted.HasValue == false || p.IsDeleted == false).ToList<Relation>();
            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No relation info found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Common.Relation> acc_ = Convert<List<BO.Common.Relation>, List<Relation>>(acc);
                return (object)acc_;
            }
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            var acc = _context.Relations.Where(p => p.Id == id && (p.IsDeleted.HasValue == false || p.IsDeleted == false)).FirstOrDefault<Relation>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            BO.Common.Relation acc_ = ObjectConvert<BO.Common.Relation, Relation>(acc);

            return (object)acc_;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
