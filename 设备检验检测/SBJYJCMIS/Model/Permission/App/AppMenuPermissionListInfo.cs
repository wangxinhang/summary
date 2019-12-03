using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [DataContract]
    public class AppMenuPermissionListInfo 
    {
        [DataMember]
        public int ResourceId { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string JianPin { get; set; }
        [DataMember]
        public int OperationId { get; set; }
        [DataMember]
        public bool Permission { get; set; }

        // <summary>
        /// Default constructor
        /// </summary>
        public AppMenuPermissionListInfo() { }

    }
}
