using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    //[Serializable]
    [DataContract]
    public class XpageInfo:CommonInfo
    {
        #region 属性字段

        //Xpage表属性字段
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string PathName { get; set; }

        #endregion 属性字段结束
        // <summary>
        /// Default constructor
        /// </summary>
        public XpageInfo() { }
    }
}
