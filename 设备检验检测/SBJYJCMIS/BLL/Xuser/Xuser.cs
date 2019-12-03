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
    public class Xuser
    {
        // Get an instance of the Menu DAL using the DALFactory       
        private static readonly IXuser dal = XuserDataAccess.CreateXuser();

        #region 记录操作
        //插入Xuser信息
        public bool XuserInsert(XuserInfo xuser,bool isCreateEmployee)
        {
            if (xuser == null) return false;
            return dal.XuserInsert(xuser,isCreateEmployee);
        }

        //更新Xuser信息
        public bool XuserUpdateById(XuserInfo xuser)
        {
            if (xuser == null) return false;
            return dal.XuserUpdateById(xuser);//执行更新命令
        }
        
        //删除Xuser信息
        public bool XuserLogicDeleteById(int xuserId, int modifierId)
        {            
            return dal.XuserLogicDeleteById(xuserId, modifierId);//执行更新命令
        }

        //重置Xuser密码为666666，或用户修改密码
        //需要传入xuserId,password,modifierId(当前操作者Id)
        public bool XuserResetPasswordById(int id, int modifierId)
        {
            return dal.XuserResetPasswordById(id, modifierId);//执行更新命令
        }

        public bool XuserUpdatePasswordById(int id,string password)
        {
            return dal.XuserUpdatePasswordById(id,password);//执行更新命令
        }
        #endregion 记录操作结束

        #region 验证用户和密码

        //验证用户是否存在
        public bool XuserIsExistedByName(string name)
        {
            return dal.XuserIsExistedByName(name);
        }
        //验证用户是否是超级管理员
        public bool IsExistedAdministrateRoleIdByXuserId(int xuserId)
        {
            return dal.IsExistedAdministrateRoleIdByXuserId(xuserId);
        }
        //判断用户密码是否正确
        public bool XuserPasswordIsValid(string xuserName, string password)
        {
            string passFromDB = dal.XuserGetPasswordByName(xuserName);
            string passFromPage = FormsAuthentication.HashPasswordForStoringInConfigFile(password, "MD5").ToLower();
            return passFromPage == passFromDB ? true : false;
        }

        //根据Name获取密码：用于密码验证
        public string XuserGetPasswordByName(string name)
        {
            if (name.Trim().Length == 0) return null;
            return dal.XuserGetPasswordByName(name);
        }

        //根据Id获取密码
        public string XuserGetPasswordById(int xuserId)
        {
            if (xuserId == 0) return null;
            return dal.XuserGetPasswordById(xuserId);
        }

        #endregion 验证用户和密码

        #region 根据条件查询Xuser记录

        //根据Name获取XuserId
        public int XuserGetIdByName(string name)
        {
            return dal.XuserGetIdByName(name);
        }

        //根据XuserId获取NameCN
        public string XuserGetNameCNById(int xuserId)
        {
            return dal.XuserGetNameCNById(xuserId);
        }

        //根据XuserId获取EmployeeId
        public int XuserGetEmployeeIdById(int xuserId)
        {
            return dal.XuserGetEmployeeIdById(xuserId);
        }

        //根据EmployeeId获取XuserId
        public int XuserGetIdByEmployeeId(int employeeId)
        {
            return dal.XuserGetIdByEmployeeId(employeeId);
        }  
        //根据XuserIdMd5获取XuserId ,Name,NameCN
        public IList<XuserForIdMd5Info> XuserGetListByIdMd5(string xuserIdMd5)
        {
            return dal.XuserGetListByIdMd5(xuserIdMd5);   
        }
        //根据RoleId获取XuserList
        public IList<XuserListInfo> XuserGetListByRoleId(string name, int roleId)
        {
            return dal.XuserGetListByRoleId(name, roleId);
        }

        //根据xuserId判断用户为处理安排人默认值
        public bool FlowNodeDefaultSettingIsExistedByXuserId(int xuserId)
        {
            return dal.FlowNodeDefaultSettingIsExistedByXuserId(xuserId);
        }

		#endregion 根据条件查询Xuser记录

		#region 获取XuserList 有重载

		//获取QueryResult
		public IList<XuserListInfo> XuserGetList(string name, string nameCN, int departmentId, int tradeTypeId, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType)

		{
			return dal.XuserGetList(name, nameCN, departmentId, tradeTypeId, isPaged, pageNumber, pageSize, orderFieldName, orderType);
		}

		//获取QueryResult分页数据；用于分页显示查询结果
		public IList<XuserListInfo> XuserGetListMergePaged(string name, string nameCN, int departmentId, int tradeTypeId, int pageNumber, int pageSize, string orderFieldName, string orderType)
		{
			return dal.XuserGetList(name, nameCN, departmentId, tradeTypeId, true, pageNumber, pageSize, orderFieldName, orderType);
		}

		//获取QueryResult不分页数据；用于RDLC报表
		public IList<XuserListInfo> XuserGetListMergeUnPaged(string name, string nameCN, int departmentId, int tradeTypeId, string orderFieldName, string orderType)
		{
			return dal.XuserGetList(name, nameCN, departmentId, tradeTypeId, false, 1, 10, orderFieldName, orderType);
		}
		#endregion 获取XuserList 结束

		#region 获取XuserList记录数

		//获取汇总
		public int XuserGetListMergeCount(string name, string nameCN, int departmentId, int tradeTypeId)
		{
			return dal.XuserGetListMergeCount(name, nameCN, departmentId, tradeTypeId);
		}
		#endregion 获取XuserList记录数 结束

    }
}
