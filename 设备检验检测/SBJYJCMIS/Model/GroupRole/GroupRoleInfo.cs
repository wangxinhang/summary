using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [DataContract]
    public class GroupRoleInfo : CommonInfo
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public int GroupId { get; set; }
        [DataMember]
        public int RoleId { get; set; }

        // <summary>
        /// Default constructor
        /// </summary> 
        public GroupRoleInfo() { }
    }
}
