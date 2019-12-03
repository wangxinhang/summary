using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    //[Serializable]
    [DataContract]
    public class FlowNodeOperationRelationListInfo:CommonInfo
    {
        #region 属性字段
        [DataMember]
        public int RowNumber { get; set; }
        [DataMember]
        public int RoleId { get; set; }
        [DataMember]
        public string RoleName { get; set; }
        [DataMember]
        public int FlowNodeId { get; set; }
        [DataMember]
        public int AssignTypeId { get; set; }
        [DataMember]
        public bool IsAssigned { get; set; }
        [DataMember]
        public int FlowId { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string Flow { get; set; }

        [DataMember]
        public string AssignType { get; set; }
        [DataMember]
        public IList<FlowOperationListInfo> FlowOperationList { get; set; }

        #endregion 属性字段
        // <summary>
        /// Default constructor
        /// </summary> 
        public FlowNodeOperationRelationListInfo() { }
    }
}
