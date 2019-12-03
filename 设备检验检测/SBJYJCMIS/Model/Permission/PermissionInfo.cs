using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [DataContract]
    public class PermissionInfo : CommonInfo
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public int OperationId { get; set; }
        [DataMember]
        public int ResourceId { get; set; }
        [DataMember]
        public bool Permissable { get; set; }//用于配置可用权限opreation列表时判断是添加还是删除一条记录

        // <summary>
        /// Default constructor
        /// </summary>
        public PermissionInfo() { }

    }
}
