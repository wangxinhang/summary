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
    public partial class RegionQueryReport : System.Web.UI.Page
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
            string id = (paramJson["id"] == null) ? "" : paramJson["id"].ToString();
            int dataStatusId = (paramJson["dataStatusId"] == null) ? 1 : Convert.ToInt32(paramJson["dataStatusId"]);
            string orderField = (paramJson["orderField"] == null) ? "" : paramJson["orderField"].ToString();
            string orderType = (paramJson["orderType"] == null) ? "" : paramJson["orderType"].ToString();
            //获取报表数据
            RegionProcess regionBll = new RegionProcess();
            IList<RegionShortInfo> rptList = new List<RegionShortInfo>();
            rptList = regionBll.GetNextLevelRegionList(id,0);
            //绑定报表       
            rptQuery.LocalReport.ReportPath = MapPath("RegionQueryReport.rdlc");
            ReportDataSource EmployeeQuery = new ReportDataSource("SourceQuery", rptList);//引号中名字和RDLC数据集中的名字要一致

            rptQuery.LocalReport.DataSources.Clear();
            rptQuery.LocalReport.DataSources.Add(EmployeeQuery);
            string paramString = "";
            paramString = "行政单位列表";
            ReportParameter paramItem = new ReportParameter("paramItem", paramString);
            rptQuery.LocalReport.SetParameters(paramItem);
            //刷新RDLC报表
            rptQuery.LocalReport.Refresh();

        }

        #endregion 添加RDLC数据集，绑定报表 结束
    }
}