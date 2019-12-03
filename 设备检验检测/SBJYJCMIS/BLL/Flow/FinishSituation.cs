using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Security;
using SBJYJCMIS.IDAL;
using SBJYJCMIS.DALFactory;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.BLL
{
    public class FinishSituation
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IFinishSituation dal = FlowDataAccess.CreateFinishSituation();

        #region 记录操作
        //插入FinishSituation信息
        public bool FinishSituationInsert(FinishSituationInfo FinishSituation)
        {
            if (FinishSituation == null) return false;
            return dal.FinishSituationInsert(FinishSituation);
        }

        //更新FinishSituation信息
        public bool FinishSituationUpdateById(FinishSituationInfo FinishSituation)
        {
            if (FinishSituation == null) return false;
            return dal.FinishSituationUpdateById(FinishSituation);
        }

        //1-0：更新FinishSituation信息的DataStatus，有重载
        public bool FinishSituationUpdateDataStatusById(int id, int dataStatusId, int modifierId)
        {
            if (id == 0 || dataStatusId == 0 || modifierId == 0) return false;

            FinishSituationInfo FinishSituation = new FinishSituationInfo();
            FinishSituation.Id = id;
            FinishSituation.DataStatusId = dataStatusId;
            FinishSituation.ModifierId = modifierId;

            return dal.FinishSituationUpdateById(FinishSituation);//执行更新命令
        }

        //1-1：逻辑删除FinishSituation信息（DataStatus=2），对1-0重载
        public bool FinishSituationLogicDeleteById(int id, int modifierId)
        {
            if (id == 0 || modifierId == 0) return false;
            return FinishSituationUpdateDataStatusById(id, 2, modifierId);//执行逻辑删除命令
        }

        #endregion 记录操作结束

        #region 验证FinishSituation名称唯一性

        //检查Name是否已存在
        public bool FinishSituationIsExisted(string name)
        {
            return dal.FinishSituationIsExistedByName(name);
        }
        //验证FinishSituation是否已存在(用于更新)
        public bool FinishSituationIsExistedByNewNameAndOldName(string newName, string oldName)
        {
            return dal.FinishSituationIsExistedByNewNameAndOldName(newName, oldName);
        }
        #endregion 验证FinishSituation名称唯一性 结束

        #region 获取FinishSituationList 有重载

        //获取QueryResult
        public IList<FinishSituationInfo> FinishSituationGetList(string name, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.FinishSituationGetList(name, isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取分页数据；用于分页显示查询结果
        public IList<FinishSituationInfo> FinishSituationGetListPaged(string name, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.FinishSituationGetList(name, true, pageNumber, pageSize, orderFieldName, orderType);
        }

        //获取不分页数据；用于RDLC报表
        public IList<FinishSituationInfo> FinishSituationGetListUnPaged(string name, string orderFieldName, string orderType)
        {
            return dal.FinishSituationGetList(name, false, 1, 10, orderFieldName, orderType);
        }

        #endregion 获取FinishSituationList 结束

        #region 获取FinishSituationList记录数

        //获取汇总
        public RecordCountInfo FinishSituationGetListSum(string name)
        {
            return dal.FinishSituationGetListSum(name);
        }

        #endregion 获取FinishSituationList记录数 结束

    }
}
