using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    //[Serializable]
    [DataContract]
    public class FlowStepListInfo : CommonInfo
    {
        #region 属性字段
        [DataMember]
        public int RowNumber { get; set; }
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



        [DataMember]
        public string Flow { get; set; }
        [DataMember]
        public string SubmitFlowNode { get; set; }
        [DataMember]
        public string ApprovalFlowNode { get; set; }
        [DataMember]
        public string FlowRule { get; set; }
        #endregion 属性字段
        // <summary>
        /// Default constructor
        /// </summary> 
        public FlowStepListInfo() { }
    }
}
