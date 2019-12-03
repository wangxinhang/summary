using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using System.Web.Security;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Microsoft.Reporting.WebForms;

using SBJYJCMIS.BLL;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.Web
{
    //注意：不能在Page_Load加载ShowQueryResult()函数，否则出现显示结果控件的高度值计算
    //错误，原因是在iFrame中加载网页，其body.ClientHeight高度并不是全部高度。
    public partial class DepartmentQueryReport : System.Web.UI.Page
    {
        //判断录入结果是否已经显示

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                BindReport();
            }
        }

        #region 添加RDLC数据集，绑定报表
        ///// <summary>
        ///// 添加RDLC数据集   
        ///// </summary>
        public void BindReport()
        {
            //获取查询参数
            string jsonString = Request.QueryString["paramJson"];
            JObject paramJson = (JObject)JsonConvert.DeserializeObject(jsonString);

            int xuserId = (paramJson["xuserId"] == null) ? 0 : Convert.ToInt32(paramJson["xuserId"]);

            int parentId = (paramJson["parentId"] == null) ? 0 : Convert.ToInt32(paramJson["parentId"]);
            string leader = (paramJson["leader"] == null || paramJson["leader"].ToString() == "") ? "" : HttpUtility.UrlDecode((paramJson["leader"]).ToString());
            string name = (paramJson["name"] == null || paramJson["name"].ToString() == "") ? "" : HttpUtility.UrlDecode((paramJson["name"]).ToString());

            int departmentTypeId = (paramJson["departmentTypeId"] == null) ? 0 : Convert.ToInt32(paramJson["departmentTypeId"]);
            int tradeTypeId = (paramJson["tradeTypeId"] == null) ? 0 : Convert.ToInt32(paramJson["tradeTypeId"]);
            int propertyId = (paramJson["propertyId"] == null) ? 0 : Convert.ToInt32(paramJson["propertyId"]);
            int dataStatusId = (paramJson["dataStatusId"] == null) ? 1 : Convert.ToInt32(paramJson["dataStatusId"]);

            int pageNumber = (paramJson["pageNumber"] == null) ? 1 : Convert.ToInt32(paramJson["pageNumber"]);
            int pageSize = (paramJson["pageSize"] == null) ? 20 : Convert.ToInt32(paramJson["pageSize"]);
            string orderFieldName = (paramJson["orderField"] == null || paramJson["orderField"].ToString() == "") ? "" : Convert.ToString(paramJson["orderField"]);
            string orderType = (paramJson["orderType"] == null || paramJson["orderType"].ToString() == "") ? "" : Convert.ToString(paramJson["orderType"]);


            //获取报表数据
            DepartmentProcess department = new DepartmentProcess();
            IList<DepartmentViewInfo> rptList = new List<DepartmentViewInfo>();
            rptList = department.GetDepartmentListUnPaged(xuserId,name, parentId, departmentTypeId, propertyId,leader, dataStatusId, orderFieldName, orderType);

            //绑定报表       
            rptQuery.LocalReport.ReportPath = MapPath("DepartmentQueryReport.rdlc");
            ReportDataSource DepartmentQuery = new ReportDataSource("DepartmentQuery", rptList);//引号中名字和RDLC数据集中的名字要一致

            rptQuery.LocalReport.DataSources.Clear();
            rptQuery.LocalReport.DataSources.Add(DepartmentQuery);

            //刷新RDLC报表
            rptQuery.LocalReport.Refresh();

        }

        #endregion 添加RDLC数据集，绑定报表 结束
    }
}