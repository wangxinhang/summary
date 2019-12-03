using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [DataContract]
    public class XuserGroupInfo:CommonInfo
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public int XuserId { get; set; }
        [DataMember]
        public int GroupId { get; set; }

        // <summary>
        /// Default constructor
        /// </summary> 
        public XuserGroupInfo() { }
    }
}
