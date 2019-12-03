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

using SBJYJCMIS.Bll;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.Web
{
    //注意：不能在Page_Load加载ShowQueryResult()函数，否则出现显示结果控件的高度值计算
    //错误，原因是在iFrame中加载网页，其body.ClientHeight高度并不是全部高度。
    public partial class ContractMonthReportOld : System.Web.UI.Page
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
        /// <summary>
        /// 添加RDLC数据集   
        /// </summary>
        public void BindReport()
        {
            //获取查询参数
            //获取查询参数
            string jsonString = Request.QueryString["paramJson"];
            JObject paramJson = (JObject)JsonConvert.DeserializeObject(jsonString);
            int departmentId = (paramJson["departmentId"] == null) ? 0 : Convert.ToInt32(paramJson["departmentId"]);
            //获取报表数据

            //传递报表参数
            List<ReportParameter> paras = new List<ReportParameter>();
            paras.Add(new ReportParameter("DepartmentID", departmentId.ToString()));
            paras.Add(new ReportParameter("IsRecordSet", "1"));
            paras.Add(new ReportParameter("IsPaged", "false"));
            paras.Add(new ReportParameter("PageNumber", "1"));
            paras.Add(new ReportParameter("PageSize", "10"));
            paras.Add(new ReportParameter("OrderFieldName", "id"));
            paras.Add(new ReportParameter("OrderType", "desc"));

            rptQuery.ServerReport.SetParameters(paras);
            rptQuery.ShowParameterPrompts = false;

        }

        #endregion 添加RDLC数据集，绑定报表 结束
    }
}