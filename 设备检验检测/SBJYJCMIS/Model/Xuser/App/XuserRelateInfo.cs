using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [DataContract]
    public class XuserRelateInfo
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string NameCN { get; set; }
        [DataMember]
        public int DepartmentId { get; set; }
        [DataMember]
        public string Department { get; set; }
        [DataMember]
        public int EmployeeId { get; set; }
        [DataMember]
        public string Employee { get; set; }
        [DataMember]
        public string Mobile { get; set; }
        [DataMember]
        public bool AccessPermission { get; set; }

        // <summary>
        /// Default constructor
        /// </summary> 
        public XuserRelateInfo() { }
    }
}
