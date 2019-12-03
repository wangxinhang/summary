using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    //[Serializable]
    [DataContract]
    public class FlowOperationHandleResultRelationListInfo:CommonInfo
    {
        #region 属性字段
        [DataMember]
        public int RowNumber { get; set; }
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public int FlowId { get; set; }
        [DataMember]
        public int FlowHandleResultId { get; set; }
        [DataMember]
        public string FlowHandleResult { get; set; }
        [DataMember]
        public int FlowOperationId { get; set; }
        [DataMember]
        public string FlowOperation { get; set; }

        [DataMember]
        public string AssignType { get; set; }
        [DataMember]
        public IList<FlowHandleResultListInfo> FlowHandleResultList { get; set; }

        #endregion 属性字段
        // <summary>
        /// Default constructor
        /// </summary> 
        public FlowOperationHandleResultRelationListInfo() { }
    }
}
