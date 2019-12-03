using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    //[Serializable]
    [DataContract]
    public class FlowNodeListInfo : CommonInfo
    {
        #region 属性字段

        [DataMember]
        public int SubmitFlowNodeId { get; set; }
        [DataMember]
        public int SubmitDepartmentId { get; set; }
        [DataMember]
        public string SubmitDepartment { get; set; }

        [DataMember]
        public int FlowOperationId { get; set; }
        [DataMember]
        public string FlowOperation { get; set; }

        [DataMember]
        public int ApprovalFlowNodeId { get; set; }
        [DataMember]
        public int ApprovalDepartmentId { get; set; }
        [DataMember]
        public string ApprovalDepartment { get; set; }
        [DataMember]
        public int ApprovalEmployeeId { get; set; }
        [DataMember]
        public string ApprovalEmployee { get; set; }

        #endregion 属性字段
        // <summary>
        /// Default constructor
        /// </summary> 
        public FlowNodeListInfo() { }
    }
}
