using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    //[Serializable]
    [DataContract]
    public class FlowOperationHandleTypeRelationInfo:CommonInfo
    {
        #region 属性字段
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public int FlowId { get; set; }
        [DataMember]
        public int FlowOperationId { get; set; }
        [DataMember]
        public int FlowHandleTypeId { get; set; }
        
       

        #endregion 属性字段
        // <summary>
        /// Default constructor
        /// </summary> 
        public FlowOperationHandleTypeRelationInfo() { }
    }
}
