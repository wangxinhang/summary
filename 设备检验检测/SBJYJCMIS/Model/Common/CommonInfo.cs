using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [DataContract]
    public class CommonInfo
    {
        [DataMember]
        public int DataStatusId { get; set; }
        [DataMember]
        public string Memo { get; set; }
        [DataMember]
        public int CreatorId { get; set; }
        [DataMember]
        public DateTime DateCreated { get; set; }
        [DataMember]
        public int ModifierId { get; set; }
        [DataMember]
        public DateTime DateModified { get; set; }

        // <summary>
        /// Default constructor
        /// </summary> 
        public CommonInfo() { }
    }
}
