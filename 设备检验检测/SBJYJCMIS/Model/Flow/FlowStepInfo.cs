using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    //[Serializable]
    [DataContract]
    public class FlowStepInfo : CommonInfo
    {
        #region 属性字段
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public int FlowId { get; set; }
        [DataMember]
        public int SubmitFlowNodeId { get; set; }
        [DataMember]
        public int ApprovalFlowNodeId { get; set; }
        [DataMember]
        public int FlowRuleId { get; set; }
        #endregion 属性字段
        // <summary>
        /// Default constructor
        /// </summary> 
        public FlowStepInfo() { }
    }
}
