using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [Serializable]
    [DataContract]
    public class EmployeeDimisionListInfo
    {
        #region 属性字段

        //基本属性
        [DataMember]
        public   int           RowNumber              { get; set; }
        [DataMember]
        public   int           Id                     { get; set; }
        [DataMember]
        public   int           EmployeeId             { get; set; }
        [DataMember]
        public   string        Reason                 { get; set; }
        [DataMember]
        public   int           DimisionTypeId         { get; set; }
        [DataMember]
        public   DateTime?     Date                   { get; set; }

        //扩展属性
        [DataMember]
        public   string        Employee               { get; set; }
        [DataMember]
        public   string        Department             { get; set; }
        [DataMember]
        public   string        WorkYear               { get; set; }
        [DataMember]
        public   string        DimisionType           { get; set; }
        [DataMember]
        public   int           EmployeeStatusId       { get; set; }
        [DataMember]
        public   string        Memo                   { get; set; }

        #endregion 属性字段
    }
}
