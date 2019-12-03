using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    //[Serializable]
    [DataContract]
    public class FlowNodeDefaultSettingListInfo : CommonInfo
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
        public int RoleId { get; set; }
        [DataMember]
        public int XuserId { get; set; }
        [DataMember]
        public int DepartmentId { get; set; }
        [DataMember]
        public int EmployeeId { get; set; }



        [DataMember]
        public string Flow { get; set; }
        [DataMember]
        public string SubmitFlowNode { get; set; }
        [DataMember]
        public string ApprovalFlowNode { get; set; }
        [DataMember]
        public string Role { get; set; }
        [DataMember]
        public string Employee { get; set; }
        [DataMember]
        public string Department { get; set; }
        [DataMember]
        public int DepartmentTypeId { get; set; }
        #endregion 属性字段
        // <summary>
        /// Default constructor
        /// </summary> 
        public FlowNodeDefaultSettingListInfo() { }
    }
}
