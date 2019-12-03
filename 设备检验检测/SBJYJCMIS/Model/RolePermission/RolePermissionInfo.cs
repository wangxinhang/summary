using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [DataContract]
    public class RolePermissionInfo : CommonInfo
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public int RoleId { get; set; }
        [DataMember]
        public int PermissionId { get; set; }
        [DataMember]
        public bool Permissable { get; set; }//用于配置可用权限opreation列表时判断是添加还是删除一条记录

        [DataMember]
        public int OperationId { get; set; }
        [DataMember]
        public int ResourceId { get; set; }

        // <summary>
        /// Default constructor
        /// </summary>
        public RolePermissionInfo() { }

    }
}
