using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [DataContract]
    public class XuserInfo:CommonInfo
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string Password { get; set; }
        [DataMember]
        public string NameCN { get; set; }
        [DataMember]
        public int DepartmentId { get; set; }
        [DataMember]
        public int EmployeeId { get; set; }
        [DataMember]
        public string IdMD5 { get; set; }
        //[DataMember]
        //public string SignImg { get; set; }
        [DataMember]
        public string FullDepartment { get; set; }
        
        // <summary>
        /// Default constructor
        /// </summary> 
        public XuserInfo() { }
    }
}
