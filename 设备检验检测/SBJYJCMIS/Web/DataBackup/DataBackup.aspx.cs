using System;
using System.Collections.Generic;
using System.IO;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using SBJYJCMIS.DBUtility;
using System.Data.SqlClient;
using SBJYJCMIS.BLL;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.Web
{    
    //注意：不能在Page_Load加载ShowInsertResult()函数，否则出现显示结果控件的高度值计算
    //错误，原因是在iFrame中加载网页，其body.ClientHeight高度并不是全部高度。
    public partial class DataBackUpInsert : System.Web.UI.Page
    {
        //判断录入结果是否已经显示，
        bool IsExisted = false;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                //绑定并全部选中ChklDrivers
                ChklDriversDataBind();
            }
           
        }
        
        #region DataBackUp数据备份
        /// <summary>
        /// 数据录入插入保存按钮事件，执行ShowInsertResult组合操作
        /// </summary>
        protected void btnBackUp_Click(object sender, EventArgs e)
        {
            #region 变量
            List<string> lstBackupInfo = new List<string>();
            lstBackupInfo.Clear();

            string souceDataBaseName = "SBJYJC";
            string bakFileName=souceDataBaseName + "_Full_" + DateTime.Now.ToString("yyyyMMdd")+".bak";

            string fullPath = GetFullPath();
            string fullPathFileName = GetFullPathFileName(fullPath, bakFileName);
            bool isBackUpDataOK = false;
            bool isBackUpLogOK = false;
            #endregion 变量

            #region 备份数据文件和日志文件
            //默认备份：检查是否本地计算机是否存在D盘，若存在，备份至D，否则备份至C
            if (chklDrivers.Items[0].Selected)
            {
                //备份数据文件
                isBackUpDataOK = BackupDataToDefalut(1,souceDataBaseName, bakFileName);
                string backupDataInfo = isBackUpDataOK ? "数据文件默认备份成功:（服务器）" + fullPathFileName : "数据文件默认备份失败，请与开发人员联系。";
                lstBackupInfo.Add(backupDataInfo);

                //备份日志文件
                //isBackUpLogOK = BackupDataToDefalut(2, souceDataBaseName, bakFileName);
                //string backupLogInfo = isBackUpLogOK ? "日志文件默认备份成功:（服务器）" + fullPathFileName.Replace("Full", "Log") : "日志文件默认备份失败，请与开发人员联系。";
                //lstBackupInfo.Add(backupLogInfo);
            }
            
            #endregion 备份数据文件和日志文件

            #region 继续执行其他备份
            //if (chklDrivers.Items[1].Selected)
            //{
            //    string mappedDriverFullPath = @"\\Johnpc\JZDFbackup";
            //    //lstBackupInfo.Add(BackupDataToMappedDriver(souceDataBaseName, mappedDriverFullPath, bakFileName));

            //    int i = defaultBackupInfo.IndexOf('\\') - 2;
            //    int j = defaultBackupInfo.LastIndexOf('\\');
            //    string sourceFullPath = defaultBackupInfo.Substring(i, j - i);                
            //    lstBackupInfo.Add(CopyToMappedDriver(sourceFullPath, mappedDriverFullPath, bakFileName));

            //}
            #endregion 继续执行其他备份

            #region 显示备份信息
            blstBackupInfo.DataSource = lstBackupInfo;
            blstBackupInfo.DataBind();
            #endregion 显示备份信息

            #region 显示下载按钮
            //根据用户Id判断用户是否是超级管理员角色
            IsExistedAdministrateRoleIdByXuserId();

            if (isBackUpDataOK && IsExisted)
            {
                  ScriptManager.RegisterStartupScript(this, this.GetType(), "HidebtnDownloadData", "document.getElementById('" + btnDownloadData.ClientID + "').style.visibility='visible';", true);
                  btnDownloadData.Focus();
            }

            if (isBackUpLogOK && IsExisted)
            {
                ScriptManager.RegisterStartupScript(this, this.GetType(), "HidebtnDownloadLog", "document.getElementById('" + btnDownloadLog.ClientID + "').style.visibility='visible';", true);
            }
            #endregion 显示下载按钮

        }

        //默认备份：检查是否本地计算机是否存在D盘，若存在，备份至D，否则备份至C     
        protected bool BackupDataToDefalut(int fileType,string sourceDataBaseName, string bakFileName)
        {
            bool IsBackUpOk = false;

            string fullPath = GetFullPath();
            string fullpathFileName = GetFullPathFileName(fullPath,bakFileName);

            if (fileType == 1)
            {
                //备份数据文件
                if (IsPathExist(fullPath))
                    IsBackUpOk = BackUpDataBase(sourceDataBaseName, fullpathFileName);
            }
            else
            {
                //备份日志
                if (IsPathExist(fullPath))
                    IsBackUpOk = BackUpLog(sourceDataBaseName, fullpathFileName);
            }

            return IsBackUpOk;
        }

        //获取完整路径
        protected string GetFullPath()
        {
            string fullPath = "D:\\SBJYJCDataBaseBackUp";
            bool IsNewDir = false;

            //全路径文件名
            if (IsPathExist("D:"))
            {
                //检查文件夹是否存在，如果不存在，创建之
                if (!IsPathExist(fullPath))
                    IsNewDir = CreateNewDir(fullPath);
            }
            else
            {
                fullPath = "C:\\SBJYJCDataBaseBackUp";

                //检查文件夹是否存在，如果不存在，创建之
                if (!IsPathExist(fullPath))
                    IsNewDir = CreateNewDir(fullPath);
            }

            return fullPath;
        }

        //获取完整路径文件名
        protected string GetFullPathFileName(string fullPath,string fileName)
        {            
            return fullPath + "\\" + fileName; ;
        }

        //其他备份：检查盘符是否存在，若存在，则备份，否则提示    
        protected string BackupDataToMappedDriver(string souceDataBaseName, string mappedDriverFullPath, string bakFileName)
        {
            using (LogonImpersonate imper = new LogonImpersonate("SBJYJC", "SBJYJCBACKUP"))
            {
                uint state = 0;
                if (!Directory.Exists("Z:"))
                {
                    state = WNetHelper.WNetAddConnection(@"SBJYJC", "SBJYJCBACKUP", mappedDriverFullPath, "Z:");
                }

                if (state.Equals(0))
                {                    
                    return BackupDataToDriver(souceDataBaseName, mappedDriverFullPath, bakFileName);
                }
                else
                {
                    //throw new Exception("添加网络驱动器错误，错误号：" + state.ToString());
                    return "网络映射驱动未连接。请确认其连接后后再执行备份。";
                }
            }
        }

        //备份到映射磁盘：拷贝方式,暂不用
        protected string CopyToMappedDriver(string sourceFullPath, string mappedDriverFullPath, string bakFileName)
        {
            using (LogonImpersonate imper = new LogonImpersonate("SBJYJC", "SBJYJCBACKUP"))
            {
                uint state = 0;
                if (!Directory.Exists("Z:"))
                {
                    state = WNetHelper.WNetAddConnection(@"SBJYJC", "SBJYJCBACKUP", mappedDriverFullPath, "Z:");
                }

                string sourceFileName = sourceFullPath.TrimEnd('\\') + "\\" + bakFileName;
                bool IsFileExisted = File.Exists(sourceFileName);
                if (state.Equals(0) && IsFileExisted)
                {
                    string destFileName = mappedDriverFullPath.TrimEnd('\\') + "\\" + bakFileName;
                    File.Copy(sourceFileName, destFileName, true);
                    File.Copy(sourceFileName.Replace("Full", "Log"), destFileName.Replace("Full", "Log"), true);
                    return "数据库网络映射备份成功:" + destFileName;
                }
                else
                {
                    //throw new Exception("添加网络驱动器错误，错误号：" + state.ToString());
                    return "网络映射驱动未连接。请确认其连接后后再执行备份。";
                }
            }                      
        }

        //其他备份：检查盘符是否存在，若存在，则备份，否则提示    
        protected string BackupDataToDriver(string souceDataBaseName, string fullPath, string bakFileName)
        {
            StringBuilder sbBackUpInfo = new StringBuilder();

            bool IsBackUpOK = false;
            string fullPathFileName = fullPath + "\\" + bakFileName;
            //备份数据库
            if (IsPathExist(fullPath))
            {
                IsBackUpOK = BackUpDataBase(souceDataBaseName, fullPathFileName);

                //显示备份成功与否信息
                if (IsBackUpOK)
                {
                    return "数据库备份成功:" + fullPathFileName;
                }
                else
                {
                    return "数据库" + fullPath + "下备份失败，请与开发人员联系。";
                }                
            }
            else
            {
                return "盘符:" + fullPath + "不存在。请确认该盘符存在后再执行备份。";
            }           
        }

        //判断一个文件夹路径是否存在
        protected bool IsPathExist(string fullPath)
        {
            if (Directory.Exists(fullPath)) 
                return true;
            else
                return false;
        }

        //判断一个文件夹路径是否存在
        protected bool CreateNewDir(string fullPath)
        {
            Directory.CreateDirectory(fullPath);
            if (IsPathExist(fullPath))
                return true;
            else
                return false;
        }

        //如果存在D盘，则备份至D:\KcwyDataBackUp,否则备份至C:\KcwyDataBackUp
        protected bool BackUpDataBase(string souceDataBaseName,string fullPathFileName)
        {            
            string SqlStrConn = SqlHelper.ConnectionString;
            string SqlStrBackUp = "backup database " + souceDataBaseName + " to disk='" + fullPathFileName + "' with init";

            SqlConnection con = new SqlConnection(SqlStrConn);
            con.Open();
            try
            {
                //备份数据库
                SqlCommand com = new SqlCommand(SqlStrBackUp, con);
                com.ExecuteNonQuery();
                return true;
            }
            catch (Exception error)
            {
                ScriptManager.RegisterStartupScript(this, this.GetType(), "BackUpErr", "alert('"+error.Message+"')", true);
                return false;
            }
            finally
            {
                con.Close();
            }
        }

        //如果存在D盘，则备份至D:\KcwyDataBackUp,否则备份至C:\KcwyDataBackUp
        protected bool BackUpLog(string souceDataBaseName, string fullPathFileName)
        {
            string SqlStrConn = SqlHelper.ConnectionString;
            string SqlStrBackUpLog = "backup log " + souceDataBaseName + " to disk='" + fullPathFileName.Replace("Full", "Log") + "' with init";

            SqlConnection con = new SqlConnection(SqlStrConn);
            con.Open();
            try
            {
                //备份日志文件
                SqlCommand comlog = new SqlCommand(SqlStrBackUpLog, con);
                comlog.ExecuteNonQuery();
                return true;
            }
            catch (Exception error)
            {
                ScriptManager.RegisterStartupScript(this, this.GetType(), "BackUpErr", "alert('" + error.Message + "')", true);
                return false;
            }
            finally
            {
                con.Close();
            }
        }

        #endregion DataBackUp数据备份

        #region 下载备份文件到本地
        /// <summary>
        /// btnDownloadData按钮点击事件：下载备份文件到本地
        /// </summary>
        protected void btnDownloadData_Click(object sender, EventArgs e)
        {
            string bakInfo = (blstBackupInfo.Items.Count == 0) ? "" : blstBackupInfo.Items[0].Text;
            int i = bakInfo.IndexOf('\\') - 2;
            if (i > 0)
            {
                string filePath = bakInfo.Substring(i);
                DownLoadBakFile(filePath);
            }

        }

        /// <summary>
        /// btnDownloadData按钮点击事件：下载备份文件到本地
        /// </summary>
        protected void btnDownloadLog_Click(object sender, EventArgs e)
        {
            string bakInfo = (blstBackupInfo.Items.Count == 0) ? "" : blstBackupInfo.Items[0].Text;
            int i = bakInfo.IndexOf('\\') - 2;
            if (i > 0)
            {
                string filePath = bakInfo.Substring(i);
                DownLoadBakFile(filePath.Replace("Full", "Log"));
            }
        }

        //下载备份文件到本地
        private void DownLoadBakFile(string filePath)
        {
            FileInfo downloadFile = new FileInfo(filePath);
            if (downloadFile.Exists)
            {
                Response.Clear();
                Response.ClearHeaders();
                Response.Buffer = false;
                Response.ContentType = "application/octet-stream";
                Response.AppendHeader("Content-Disposition", "attachement;filename=" + HttpUtility.UrlEncode(downloadFile.Name, System.Text.Encoding.UTF8));
                Response.AppendHeader("Content-Length", downloadFile.Length.ToString());
                Response.WriteFile(downloadFile.FullName);
                Response.Flush();
                Response.End();
            }
        }
        #endregion 下载备份文件到本地

        #region chklDriver数据绑定

        protected void ChklDriversDataBind()
        {
            List<ListItem> lstDirvers = new List<ListItem>();
            lstDirvers.Add(new ListItem("默认备份", "D:"));
            lstDirvers.Add(new ListItem("同时备份到网络映射Z盘", "Z:"));


            chklDrivers.DataSource = lstDirvers;
            chklDrivers.DataTextField = "Text";
            chklDrivers.DataValueField = "Value";
            chklDrivers.DataBind();            

            //默认全部选中            
            int c = chklDrivers.Items.Count;            
            for (int i = 0; i < c; i++)
            {
                chklDrivers.Items[0].Selected = true;
                if (i == 0) chklDrivers.Items[i].Enabled = false;
            }
        }
        #endregion chklDriver数据绑定

        #region 根据用户Id判断用户是否是超级管理员角色
        protected void IsExistedAdministrateRoleIdByXuserId()
        {
            Xuser XuserBll = new Xuser();
            int xuserId = (hiddenXuserId.Value.Trim().Length == 0) ? 0 : Convert.ToInt32(hiddenXuserId.Value);
            IsExisted = XuserBll.IsExistedAdministrateRoleIdByXuserId(xuserId);
        }
        #endregion
    }
}