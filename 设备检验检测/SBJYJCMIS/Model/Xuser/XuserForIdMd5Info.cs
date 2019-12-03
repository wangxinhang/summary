using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    //[Serializable]
    [DataContract]
    public class XuserForIdMd5Info
    {
        #region 属性字段
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
        public int DepartmentTypeId { get; set; }
        [DataMember]
        public string Position { get; set; }
		[DataMember]
		public int TradeTypeId { get; set; }
		[DataMember]
		public int PropertyId { get; set; }

        #endregion 属性字段
        // <summary>
        /// Default constructor
        /// </summary> 
        public XuserForIdMd5Info() { }
    }
}
