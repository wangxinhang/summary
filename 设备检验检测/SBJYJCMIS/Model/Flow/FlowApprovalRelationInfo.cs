using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    //[Serializable]
    [DataContract]
    public class FlowApprovalRelationInfo
    {
        #region 属性字段
        [DataMember]
        public int RowNumber { get; set; }
        [DataMember]
        public int FlowId { get; set; }
        [DataMember]
        public int FlowNodeId { get; set; }
        [DataMember]
        public string FlowNode { get; set; }
        [DataMember]
        public int RoleId { get; set; }
        [DataMember]
        public int FlowNodeTypeId { get; set; }
        [DataMember]
        public int ApproverId { get; set; }
        [DataMember]
        public int FlowTypeId { get; set; }
        [DataMember]
        public bool IsAssigned { get; set; }
        [DataMember]
        public int AssignType { get; set; }

        #endregion 属性字段
        // <summary>
        /// Default constructor
        /// </summary> 
        public FlowApprovalRelationInfo() { }
    }
}
