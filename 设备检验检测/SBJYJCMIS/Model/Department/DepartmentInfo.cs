using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [Serializable]
    [DataContract]
    public class DepartmentInfo : CommonInfo
    {

        #region 属性字段
        [DataMember]
        public   int      RowNumber                 { get; set; }
        [DataMember]
        public   int      Id                        { get; set; }
		[DataMember]
        public   string   Name                      { get; set; }
		[DataMember]
		public   string   ShortName                 { get; set; }
		[DataMember]
        public   int      ParentId                  { get; set; }
        [DataMember]
        public string ParentName { get; set; }
        [DataMember]
        public string RegionId  { get; set; }
        [DataMember]
        public int PropertyId { get; set; }
        [DataMember]
        public   int      DepartmentTypeId          { get; set; }
        [DataMember]
        public int LeaderId { get; set; }
        [DataMember]
		public decimal Longitude { get; set; }
		[DataMember]
		public decimal Latitude { get; set; }
        [DataMember]
        public bool IsLocked { get; set; }
        #endregion 属性字段
    }
}
