using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [DataContract]
    public class ContractDepartmentInfo
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public int ParentId { get; set; }
        [DataMember]
        public int DepartmentTypeId { get; set; }
        [DataMember]
        public string DepartmentType { get; set; }
        
        // <summary>
        /// Default constructor
        /// </summary>
        public ContractDepartmentInfo() { }
    }
}
