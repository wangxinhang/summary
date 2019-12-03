using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [DataContract]
    public class DepartmentViewInfo
    {
        //基本属性
        [DataMember]
        public int      RowNumber                      { get; set; }
        [DataMember]
        public int      Id                             { get; set; }
        [DataMember]
        public string   Name                           { get; set; }
		[DataMember]
		public string ShortName { get; set; }
		[DataMember]
        public int      ParentId                       { get; set; }
        [DataMember]
        public string   RegionId       { get; set; }
        [DataMember]
        public string Region { get; set; }
        [DataMember]
        public int PropertyId { get; set; }
        [DataMember]
        public string Property { get; set; }
        [DataMember]
        public int      DepartmentTypeId               { get; set; }
        [DataMember]
        public string   DepartmentType                 { get; set; }
        [DataMember]
        public int LeaderId { get; set; }
        [DataMember]
        public string Leader { get; set; }
        [DataMember]
        public string   FullName                       { get; set; }
        //扩展属性
        [DataMember]
        public string   ParentDepartment               { get; set; }
		[DataMember]
		public decimal Longitude { get; set; }
		[DataMember]
		public decimal Latitude { get; set; }
        [DataMember]
        public bool IsLocked { get; set; }
        [DataMember]
        public string Lock { get; set; }
        [DataMember]
        public int      DataStatusId                   { get; set; }
        [DataMember]
        public string   Memo                           { get; set; }
    }
}
