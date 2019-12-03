using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [DataContract]
    public class XuserListInfo
    {
        [DataMember]
        public int      RowNumber    { get; set; }
        [DataMember]
        public int      Id           { get; set; }
        [DataMember]
        public string   Name         { get; set; }
        [DataMember]
        public string   NameCN       { get; set; }
        //[DataMember]
        //public string SignImg { get; set; }
        [DataMember]
        public int      DepartmentId { get; set; }
        [DataMember]
        public string   Department { get; set; }
        [DataMember]
        public int      EmployeeId   { get; set; }
        [DataMember]
        public string   Memo         { get; set; }   
        [DataMember]
        public int      GroupId { get; set; }
        [DataMember]
        public string   GroupName { get; set; }
        [DataMember]
        public int      RoleId { get; set; }
        [DataMember]
        public string   Role { get; set; }
        [DataMember]
        public string   Employee { get; set; }
        [DataMember]
        public int      BaseStationCount { get; set; }
		[DataMember]
		public string FullDepartment { get; set; }
        [DataMember]
        public int DepartmentTypeId { get; set; }
        [DataMember]
        public string DepartmentType { get; set; }
		// <summary>
		/// Default constructor
		/// </summary> 
		public XuserListInfo() { }
    }
}
