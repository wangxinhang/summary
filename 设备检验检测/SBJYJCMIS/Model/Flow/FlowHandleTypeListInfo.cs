using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    //[Serializable]
    [DataContract]
    public class FlowHandleTypeListInfo : CommonInfo
    {
        #region 属性字段
        [DataMember]
        public int RowNumber { get; set; }
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public int FlowHandleResultId { get; set; }
        [DataMember]
        public string FlowHandleResult { get; set; }
        [DataMember]
        public bool Permissable { get; set; }
        [DataMember]
        public bool IsAssigned { get; set; }
        [DataMember]
        public int FlowId { get; set; }
        [DataMember]
        public string Flow { get; set; }
        [DataMember]
        public int FlowHandleTypeId { get; set; }
        [DataMember]
        public string FlowHandleType { get; set; }



        #endregion 属性字段
        // <summary>
        /// Default constructor
        /// </summary> 
        public FlowHandleTypeListInfo() { }
    }
}
