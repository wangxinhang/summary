using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    //[Serializable]
    [DataContract]
    public class FlowApprovalRelationSumInfo
    {
        #region 属性字段
        [DataMember]
        public int RecordCount { get; set; }        

        #endregion 属性字段
        // <summary>
        /// Default constructor
        /// </summary> 
        public FlowApprovalRelationSumInfo() { }
    }
}
