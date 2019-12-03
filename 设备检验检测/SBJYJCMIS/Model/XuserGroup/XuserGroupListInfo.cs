using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [DataContract]
    public class XuserGroupListInfo
    {
        [DataMember]
        public int RowNumber { get; set; }
        [DataMember]
        public int XuserId { get; set; }
        [DataMember]
        public string XuserName { get; set; }
        [DataMember]
        public string XuserNameCN { get; set; }
        [DataMember]
        public int DepartmentId { get; set; }
        [DataMember]
        public string Department { get; set; }
        [DataMember]
        public int EmployeeId { get; set; }
        [DataMember]
        public string Memo { get; set; }
        [DataMember]
        public int GroupId { get; set; }
        [DataMember]
        public string GroupName { get; set; }
        [DataMember]
        public bool IsAssigned { get; set; }

        // <summary>
        /// Default constructor
        /// </summary> 
        public XuserGroupListInfo() { }
    }
}