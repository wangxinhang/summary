using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    //[Serializable]
    [DataContract]
    public class FlowNodeOperationRelationInfo:CommonInfo
    {
        #region 属性字段
        [DataMember]
        public int RowNumber { get; set; }
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public int FlowId { get; set; }
        [DataMember]
        public int FlowNodeId { get; set; }
        [DataMember]
        public string FlowNode { get; set; }
        [DataMember]
        public int RoleId { get; set; }
        [DataMember]
        public int FlowOperationId { get; set; }
        [DataMember]
        public string FlowOperation { get; set; }
        [DataMember]
        public int ApproverId { get; set; }
       
       
        [DataMember]
        public bool IsAssigned { get; set; }
        [DataMember]
        public int AssignType { get; set; }
        [DataMember]
        public bool Permissable { get; set; }

        #endregion 属性字段
        // <summary>
        /// Default constructor
        /// </summary> 
        public FlowNodeOperationRelationInfo() { }
    }
}
