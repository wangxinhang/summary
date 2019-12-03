using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [Serializable]
    [DataContract]
    public class EmployeeStatusListInfo
    {
        #region 属性字段

        [DataMember]
        public   int      RowNumber            { get; set; }
        [DataMember]
        public   int      Id                   { get; set; }
        [DataMember]
        public   string   Name                 { get; set; }
        [DataMember]
        public   string   Memo                 { get; set; }

        #endregion 属性字段 
    }
}
