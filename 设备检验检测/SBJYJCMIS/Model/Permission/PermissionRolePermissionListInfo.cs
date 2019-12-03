using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [DataContract]
    public class PermissionRolePermissionListInfo
    {
        [DataMember]
        public int RowNumber { get; set; }
        [DataMember]
        public int ResourceId { get; set; }
        [DataMember]
        public string Resource { get; set; }
        [DataMember]
        public int ResourceTypeId { get; set; }
        [DataMember]
        public string ResourceType { get; set; }
        [DataMember]
        public IList<RolePermissionOperationListInfo> RolePermissionOperationList { get; set; }

        [DataMember]
        public string Memo { get; set; }
        // <summary>
        /// Default constructor
        /// </summary> 
        public PermissionRolePermissionListInfo() { }
    }
}
