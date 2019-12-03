using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Microsoft.Reporting.WebForms;

using SBJYJCMIS.BLL;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.Web
{
    public partial class MineQueryReport : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                BindReport();
            }
        }

        #region 添加RDLC数据集，绑定报表
        public void BindReport()
        {
            //获取查询参数
            string jsonString = Request.QueryString["paramJson"];
            JObject paramJson = (JObject)JsonConvert.DeserializeObject(jsonString);

            int SJQYId = (paramJson["SJQYId"] == null) ? 0 : Convert.ToInt32(paramJson["SJQYId"]);
            int JCBMId = (paramJson["JCBMId"] == null) ? 0 : Convert.ToInt32(paramJson["JCBMId"]);
            int SZQYId = (paramJson["SZQYId"] == null) ? 0 : Convert.ToInt32(paramJson["SZQYId"]);
            string MKBM = (paramJson["MKBM"] == null || paramJson["MKBM"].ToString() == "") ? "" : HttpUtility.UrlDecode((paramJson["MKBM"]).ToString());

            int pageNumber = (paramJson["pageNumber"] == null) ? 1 : Convert.ToInt32(paramJson["pageNumber"]);
            int pageSize = (paramJson["pageSize"] == null) ? 15 : Convert.ToInt32(paramJson["pageSize"]);
            string orderFieldName = (paramJson["orderField"] == null || paramJson["orderField"].ToString() == "") ? "" : Convert.ToString(paramJson["orderField"]);
            string orderType = (paramJson["orderType"] == null || paramJson["orderType"].ToString() == "") ? "" : Convert.ToString(paramJson["orderType"]);


            //获取报表数据
            Mine bllProcess = new Mine();
            IList<MineInfo> rptList = new List<MineInfo>();
            rptList = bllProcess.MineGetList(MKBM, SJQYId, JCBMId, SZQYId, true, pageNumber, pageSize, orderFieldName, orderType);

            //绑定报表       
            rptQuery.LocalReport.ReportPath = MapPath("MineQueryReport.rdlc");
            ReportDataSource MineQuery = new ReportDataSource("MineQuery", rptList);//引号中名字和RDLC数据集中的名字要一致

            rptQuery.LocalReport.DataSources.Clear();
            rptQuery.LocalReport.DataSources.Add(MineQuery);

            //刷新RDLC报表
            rptQuery.LocalReport.Refresh();
        }

        #endregion 添加RDLC数据集，绑定报表 结束



    }
}

