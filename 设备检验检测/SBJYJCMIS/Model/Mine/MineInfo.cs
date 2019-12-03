using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace SBJYJCMIS.Model
{
    [DataContract]
    public class MineInfo : CommonInfo
    {
        [DataMember]
        public int RowNumber { get; set; }
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public int SJQYId { get; set; }
        [DataMember]
        public int JCBMId { get; set; }
        [DataMember]
        public int SZQYId { get; set; }
        [DataMember]
        public string MKBH { get; set; }
        [DataMember]
        public string MKBM { get; set; }
        [DataMember]
        public string KJMC { get; set; }
        [DataMember]
        public string KJJC { get; set; }
        [DataMember]
        public string KJDZ { get; set; }
        [DataMember]
        public string SZSBM { get; set; }
        [DataMember]
        public string SZXBM { get; set; }
        [DataMember]
        public string JCBMBM { get; set; }
        [DataMember]
        public string JGBMBM { get; set; }
        [DataMember]
        public string LXR { get; set; }
        [DataMember]
        public string LXDH { get; set; }
        [DataMember]
        public string SJQYBM { get; set; }
        [DataMember]
        public string ZGZFBMJB { get; set; }
        [DataMember]
        public string AQSCXKZZT { get; set; }
        [DataMember]
        public string MKLX { get; set; }
        [DataMember]
        public string JJLX { get; set; }
        [DataMember]
        public string KJZK { get; set; }
        [DataMember]
        public string SJ { get; set; }
        [DataMember]
        public string SJQYName { get; set; }
        [DataMember]
        public string SZSName { get; set; }
        [DataMember]
        public string SZXName { get; set; }
        [DataMember]
        public string JCBMName { get; set; }
        [DataMember]
        public string JGBMName { get; set; }
    }
}
