using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [DataContract]
    public class GroupRoleListInfo
    {
        [DataMember]
        public int RowNumber { get; set; }
        [DataMember]
        public int GroupId { get; set; }
        [DataMember]
        public string GroupName { get; set; }
        [DataMember]
        public string Memo { get; set; }
        [DataMember]
        public int RoleId { get; set; }
        [DataMember]
        public string RoleName { get; set; }
        [DataMember]
        public bool IsAssigned { get; set; }

        // <summary>
        /// Default constructor
        /// </summary> 
        public GroupRoleListInfo() { }
    }
}