using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [DataContract]
    public class PermissionListInfo 
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public int OperationId { get; set; }
        [DataMember]
        public int ResourceId { get; set; }

        // <summary>
        /// Default constructor
        /// </summary>
        public PermissionListInfo() { }

    }
}
