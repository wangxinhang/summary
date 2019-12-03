using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [Serializable]
    [DataContract]
    public class EmployeePositionLogInfo : CommonInfo
    {
        #region 属性字段

        //基本属性
        [DataMember]
        public   int          RowNumber               { get; set; }
        [DataMember]
        public   int          Id                      { get; set; }
        [DataMember]
        public   int          EmployeeId              { get; set; }
        [DataMember]
        public   int          OldPositionId           { get; set; }
        [DataMember]
        public   int          NewPositionId           { get; set; }
        [DataMember]
        public   string       Reason                  { get; set; }
        [DataMember]
        public   DateTime?    Date                    { get; set; }

        //扩展属性
        [DataMember]
        public   string       Employee                { get; set; }
        [DataMember]
        public   string       OldPosition             { get; set; }
        [DataMember]
        public   string       NewPosition             { get; set; }
        [DataMember]
        public   string       AdjustmentProcedure     { get; set; }
        [DataMember]
        public   string       AdjustmentProcedureList { get; set; }

        #endregion 属性字段

    }
}
