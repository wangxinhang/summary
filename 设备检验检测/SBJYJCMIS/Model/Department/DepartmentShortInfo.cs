using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace SBJYJCMIS.Model
{
	[DataContract]
	public class DepartmentShortInfo
	{
		[DataMember]
		public int Id { get; set; }
		[DataMember]
		public string Name { get; set; }
		[DataMember]
		public string ShortName { get; set; }
		[DataMember]
		public int ParentId { get; set; }
		[DataMember]
		public int Grade { get; set; }
	}

}
