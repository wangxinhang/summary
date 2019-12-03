using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [DataContract]
    public class XuserPushInfo
    {
        [DataMember]
        public int Abnormity { get; set; }
        [DataMember]
        public int PatrolTask { get; set; }
        [DataMember]
        public int PowerCutNotice { get; set; }
    }
}
