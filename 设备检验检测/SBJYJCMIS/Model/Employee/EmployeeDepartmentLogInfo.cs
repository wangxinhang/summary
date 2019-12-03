using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [Serializable]
    [DataContract]
    public class EmployeeDepartmentLogInfo : CommonInfo
    {
        #region 属性字段

        [DataMember]
        public   int          RowNumber               { get; set; }
        [DataMember]
        public   int          Id                      { get; set; }
        [DataMember]
        public   int          EmployeeId              { get; set; }
        [DataMember]
        public   int          OldDepartmentId         { get; set; }
        [DataMember]
        public   int          NewDepartmentId         { get; set; }
        [DataMember]
        public   string       Reason                  { get; set; }
        [DataMember]
        public   DateTime?    Date                    { get; set; }

        //扩展参数
        [DataMember]
        public   string       Employee                { get; set; }
        [DataMember]
        public   string       OldDepartment           { get; set; }
        [DataMember]
        public   string       NewDepartment           { get; set; }
        [DataMember]
        public   string       AdjustmentProcedure     { get; set; }
        [DataMember]
        public   string       AdjustmentProcedureList { get; set; }

        #endregion 属性字段

    }
}
