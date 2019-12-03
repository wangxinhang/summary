using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [DataContract]
    public class RolePermissionOperationListInfo 
    {
        [DataMember]
        public int OperationId { get; set; }
        [DataMember]
        public string Operation { get; set; }
        [DataMember]
        public bool Permissable { get; set; }

        // <summary>
        /// Default constructor
        /// </summary>
        public RolePermissionOperationListInfo() { }

    }
}
