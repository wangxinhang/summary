using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface IXuser
    {
        #region 增删改
        //插入、更新、删除Xuser新记录
        bool XuserInsert(XuserInfo xuser,bool isCreateEmployee);
        bool XuserUpdateById(XuserInfo xuser);
        bool XuserLogicDeleteById(int xuserId, int modifierId);
        bool XuserResetPasswordById(int id, int modifierId);

        bool XuserUpdatePasswordById(int id, string password);
        #endregion 记录操作

        #region 用户和密码验证
        //根据条件获取结果    
        bool XuserIsExistedByName(string name);

        //获取密码：用于用户验证 
        string XuserGetPasswordById(int xuserId);
        string XuserGetPasswordByName(string name);
         //验证用户是否是超级管理员
        bool IsExistedAdministrateRoleIdByXuserId(int xuserId);
        #endregion 用户和密码验证

        #region 根据条件获取结果
        int XuserGetIdByName(string name);
        string XuserGetNameCNById(int xuserId);
        int XuserGetEmployeeIdById(int xuserId);
        int XuserGetIdByEmployeeId(int employeeId);
         //根据RoleId获取XuserList
        IList<XuserListInfo> XuserGetListByRoleId(string name, int roleId);

        //通过MD5获取Id
        IList<XuserForIdMd5Info> XuserGetListByIdMd5(string xuserIdMd5);

        //根据xuserId判断用户为处理安排人默认值
        bool FlowNodeDefaultSettingIsExistedByXuserId(int xuserId);

		#endregion 根据条件获取结果

		#region 获取Xuser记录集和记录数
		//获取Xuser记录集和记录数
		IList<XuserListInfo> XuserGetList(string name, string nameCN, int departmentId, int tradeTypeId, bool isPaged, int pageNumber, int pageSize, string orderFieldName, string orderType);
		int XuserGetListMergeCount(string name, string nameCN, int departmentId, int tradeTypeId);

		#endregion 获取Xuser记录集和记录数   

    }
}
