using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using System.Web.Security;
using SBJYJCMIS.BLL;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.Web
{    
    //注意：不能在Page_Load加载ShowInsertResult()函数，否则出现显示结果控件的高度值计算
    //错误，原因是在iFrame中加载网页，其body.ClientHeight高度并不是全部高度。
    public partial class XMenuManagement : System.Web.UI.Page
    {
        //判断录入结果是否已经显示，
        //private bool IsResultShowed = false;

        protected void Page_Load(object sender, EventArgs e)
        {
        }        
    }
}