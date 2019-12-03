using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [DataContract]
    public class AppMenuPermissionInfo : CommonInfo
    {
        [DataMember]
        public int ResourceId { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string JianPin { get; set; }

        // <summary>
        /// Default constructor
        /// </summary>
        public AppMenuPermissionInfo() { }

    }
}
