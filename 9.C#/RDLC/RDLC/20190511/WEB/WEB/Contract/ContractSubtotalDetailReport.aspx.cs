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
    public partial class ContractSubtotalDetailReport : System.Web.UI.Page
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
            string jsonString = Request.QueryString["paramJson"];
            JObject paramJson = (JObject)JsonConvert.DeserializeObject(jsonString);
            int departmentId = (paramJson["departmentId"] == null) ? 0 : Convert.ToInt32(paramJson["departmentId"]);

            string orderFieldName = "ID";
            string orderType = "DESC";
            //获取报表数据
            NewContractSubtotal recordBll = new NewContractSubtotal();
            IList<NewContractSubtotalInfo> recordList = new List<NewContractSubtotalInfo>();

            recordList = recordBll.ContractSubtotalGetListUnPaged( departmentId, orderFieldName, orderType);

            //绑定报表       
            rptQuery.LocalReport.ReportPath = MapPath("ContractSubtotalDetailReport.rdlc");
            ReportDataSource ContractList = new ReportDataSource("ContractList", recordList);//引号中名字和RDLC数据集中的名字要一致

            rptQuery.LocalReport.DataSources.Clear();
            rptQuery.LocalReport.DataSources.Add(ContractList);

            //传递报表参数
            #region 传递报表参数
            

            string paraDepartment = departmentId == 0 ? "" : "," + paramJson["department"].ToString();
            string paramString = (paraDepartment ).Trim();
            if (paramString.Length > 0) { paramString = "(" + paramString.Substring(1) + ")"; }
            ReportParameter paramItemParam = new ReportParameter("paramItemParam", paramString);
            rptQuery.LocalReport.SetParameters(paramItemParam);
            #endregion 传递报表参数

            //刷新RDLC报表
            rptQuery.LocalReport.Refresh();

        }

        #endregion 添加RDLC数据集，绑定报表 结束
    }
}