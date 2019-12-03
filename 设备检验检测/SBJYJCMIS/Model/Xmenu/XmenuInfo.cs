using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [DataContract]
    public class XmenuInfo:CommonInfo
    {
        #region 属性字段
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string IconUrl { get; set; }
        [DataMember]
        public int ParentId { get; set; }
        [DataMember]
        public int Sequence { get; set; }
        [DataMember]
        public int XpageId { get; set; }

        #endregion 属性字段
        // <summary>
        /// Default constructor
        /// </summary> 
        public XmenuInfo() { }
    }
}
