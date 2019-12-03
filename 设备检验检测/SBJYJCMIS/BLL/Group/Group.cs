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
    public class Group
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IGroup dal = GroupDataAccess.CreateGroup();

        #region 记录操作
        //插入Group信息
        public bool GroupInsert(GroupInfo group)
        {
            if (group == null) return false;
            return dal.GroupInsert(group);
        }

        //删除Group信息
        public bool GroupDeleteTranById(int id)
        {
            return dal.GroupDeleteTranById(id);//执行更新命令
        }

        //更新Group信息
        public bool GroupUpdateById(GroupInfo group)
        {
            if (group == null) return false;
            return dal.GroupUpdateById(group);//执行更新命令
        }

        #endregion 记录操作结束

        #region 根据条件查询Group记录

        //验证是否存在
        public bool GroupIsExistedByName(string name)
        {
            return dal.GroupIsExistedByName(name);
        }
		#endregion 根据条件查询Group记录

		#region 获取GroupList 有重载

		public IList<GroupListInfo> GroupOnlyGetList(string name, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
		{
			return dal.GroupOnlyGetList(name, isPaged, pageNumber, pageSize, orderFieldName, orderType);
		}

		//获取QueryResult
		public IList<GroupListInfo> GroupGetList(string name, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.GroupGetList(name, isPaged, pageNumber, pageSize, orderFieldName, orderType);
        }

		public IList<GroupListInfo> GroupGetListMerge(string name, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)
		{
			return dal.GroupGetListMerge(name, isPaged, pageNumber, pageSize, orderFieldName, orderType);
		}

		//获取分页数据；用于分页显示查询结果
		public IList<GroupListInfo> GroupOnlyGetListPaged(string name, int pageNumber, int pageSize, string orderFieldName, string orderType)
		{
			return dal.GroupOnlyGetList(name, true, pageNumber, pageSize, orderFieldName, orderType);
		}
		public IList<GroupListInfo> GroupGetListPaged(string name, int pageNumber, int pageSize, string orderFieldName, string orderType)
        {
            return dal.GroupGetList(name, true, pageNumber, pageSize, orderFieldName, orderType);
        }
		public IList<GroupListInfo> GroupGetListMergePaged(string name, int pageNumber, int pageSize, string orderFieldName, string orderType)
		{
			return dal.GroupGetListMerge(name, true, pageNumber, pageSize, orderFieldName, orderType);
		}

		//获取不分页数据；用于RDLC报表
		public IList<GroupListInfo> GroupOnlyGetListUnPaged(string name, string orderFieldName, string orderType)
		{
			return dal.GroupOnlyGetList(name, false, 1, 10, orderFieldName, orderType);
		}
		public IList<GroupListInfo> GroupGetListUnPaged(string name, string orderFieldName, string orderType)
        {
            return dal.GroupGetList(name, false, 1, 10, orderFieldName, orderType);
        }
		public IList<GroupListInfo> GroupGetListMergeUnPaged(string name, string orderFieldName, string orderType)
		{
			return dal.GroupGetListMerge(name, false, 1, 10, orderFieldName, orderType);
		}

		#endregion 获取GroupList 结束




		#region 获取GroupList记录数

		//获取汇总
		public GroupSumInfo GroupGetListSum(string name)
        {
            return dal.GroupGetListSum(name);
        }

		public GroupSumInfo GroupOnlyGetListSum(string name)
		{
			return dal.GroupOnlyGetListSum(name);
		}
		public GroupSumInfo GroupGetListMergeSum(string name)
		{
			return dal.GroupGetListMergeSum(name);
		}
		#endregion 获取GroupList记录数 结束
	}
}
