using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [DataContract]
    public class PermissionRoleDepartmentListInfo
    {
        [DataMember]
        public int RowNumber { get; set; }
        [DataMember]
        public int DepartmentId { get; set; }
        [DataMember]
        public string Department { get; set; }
        [DataMember]
        public int RoleId { get; set; }
        [DataMember]
        public bool IsIncludingChildren { get; set; }
        [DataMember]
        public bool Permissable { get; set; }
        [DataMember]
        public int AssignType { get; set; }

        // <summary>
        /// Default constructor
        /// </summary> 
        public PermissionRoleDepartmentListInfo() { }
    }
}
