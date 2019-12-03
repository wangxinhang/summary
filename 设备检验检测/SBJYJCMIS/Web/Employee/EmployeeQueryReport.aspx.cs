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
    public partial class EmployeeQueryReport : System.Web.UI.Page
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

            string name = (paramJson["name"] == null || paramJson["name"].ToString() == "") ? "" : HttpUtility.UrlDecode((paramJson["name"]).ToString());
            string pinYin = (paramJson["pinYin"] == null || paramJson["pinYin"].ToString() == "") ? "" : HttpUtility.UrlDecode((paramJson["pinYin"]).ToString());
            int sex = (paramJson["sex"] == null) ? 2 : Convert.ToInt32(paramJson["sex"]);
            int maritalStatus = (paramJson["maritalStatus"] == null) ? 2 : Convert.ToInt32(paramJson["maritalStatus"]);
            int nationId = (paramJson["nationId"] == null) ? 0 : Convert.ToInt32(paramJson["nationId"]);
            int educationId = (paramJson["educationId"] == null) ? 0 : Convert.ToInt32(paramJson["educationId"]);
            int positionId = (paramJson["positionId"] == null) ? 0 : Convert.ToInt32(paramJson["positionId"]);
            int departmentId = (paramJson["departmentId"] == null) ? 0 : Convert.ToInt32(paramJson["departmentId"]);
            int employeeStatusId = (paramJson["employeeStatusId"] == null) ? 0 : Convert.ToInt32(paramJson["employeeStatusId"]);

            string dateOperator = (paramJson["dateOperator"] == null) ? null : (paramJson["dateOperator"]).ToString();
            //DateTime? beginDate = (paramJson["beginDate"] == null) ? null : (DateTime?)Convert.ToDateTime(paramJson["beginDate"]);
            //DateTime? endDate = (paramJson["endDate"] == null) ? null : (DateTime?)Convert.ToDateTime(paramJson["endDate"]);

            DateTime? beginDate;
            if (paramJson["beginDate"] == null)
            {
                beginDate = Convert.ToDateTime("1900-01-01");
            }
            else
            {
                beginDate = (DateTime?)Convert.ToDateTime(paramJson["beginDate"]);
            }
           

            DateTime? endDate;
            //string EndDate = paramJson["endDate"].ToString();
            if (paramJson["endDate"] == null)
            {
                DateTime today = DateTime.Today;
                endDate = Convert.ToDateTime(today);
            }
            else
            {
                endDate = (DateTime?)Convert.ToDateTime(paramJson["endDate"]);
            }

            int dataStatusId = (paramJson["dataStatusId"] == null) ? 1 : Convert.ToInt32(paramJson["dataStatusId"]);

            int pageNumber = (paramJson["pageNumber"] == null) ? 1 : Convert.ToInt32(paramJson["pageNumber"]);
            int pageSize = (paramJson["pageSize"] == null) ? 20 : Convert.ToInt32(paramJson["pageSize"]);
            string orderFieldName = (paramJson["orderField"] == null || paramJson["orderField"].ToString() == "") ? null : Convert.ToString(paramJson["orderField"]);
            string orderType = (paramJson["orderType"] == null || paramJson["orderType"].ToString() == "") ? null : Convert.ToString(paramJson["orderType"]);

            int departmentDataTypeId = (paramJson["departmentDataTypeId"] == null) ? 1 : Convert.ToInt32(paramJson["departmentDataTypeId"]);
            //获取报表数据
            EmployeeProcess employeeBll = new EmployeeProcess();
            IList<EmployeeViewInfo> rptList = new List<EmployeeViewInfo>();
            rptList = employeeBll.GetEmployeeListUnPaged(name, pinYin, sex, maritalStatus, nationId, educationId, positionId, departmentId, employeeStatusId, dateOperator, beginDate, endDate, xuserId, departmentDataTypeId, orderFieldName, orderType);

            //绑定报表       
            rptQuery.LocalReport.ReportPath = MapPath("EmployeeQueryReport.rdlc");
            ReportDataSource employeeQuery = new ReportDataSource("employeeQuery", rptList);//引号中名字和RDLC数据集中的名字要一致

            rptQuery.LocalReport.DataSources.Clear();
            rptQuery.LocalReport.DataSources.Add(employeeQuery);

            //刷新RDLC报表
            rptQuery.LocalReport.Refresh();

        }

        #endregion 添加RDLC数据集，绑定报表 结束
    }
}