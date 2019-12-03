using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    //[Serializable]
    [DataContract]
    public class FlowInfo:CommonInfo
    {
        #region 属性字段
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string Name { get; set; }

        //扩展属性，将关联ID替换为其名称
        [DataMember]
        public string DataStatus { get; set; }
        [DataMember]
        public string Creator { get; set; }
        [DataMember]
        public string Modifier { get; set; }
        [DataMember]
        public int RowNumber { get; set; }

        #endregion 属性字段
        // <summary>
        /// Default constructor
        /// </summary> 
        public FlowInfo() { }
    }
}
