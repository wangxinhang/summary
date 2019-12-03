using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace SBJYJCMIS.Model
{
	[DataContract]
	public class TreeViewInfo
	{
		[DataMember]
		public string Id { get; set; }
		[DataMember]
		public string Name { get; set; }
		[DataMember]
		public string ShortName { get; set; }
		[DataMember]
		public string ParentId { get; set; }
		[DataMember]
		public int HasPermission { get; set; }
		[DataMember]
		public int SourceId { get; set; }
		[DataMember]
		public int UnitDataSourceTypeId { get; set; }
	}

	[DataContract]
	public class TreeViewCoordinateInfo
	{
		[DataMember]
		public string Id { get; set; }
		[DataMember]
		public string Name { get; set; }
		[DataMember]
		public string ShortName { get; set; }
		[DataMember]
		public string ParentId { get; set; }
		[DataMember]
		public int HasPermission { get; set; }
		[DataMember]
		public int SourceId { get; set; }
		[DataMember]
		public int UnitDataSourceTypeId { get; set; }
		[DataMember]
		public decimal Longitude { get; set; }
		[DataMember]
		public decimal Latitude { get; set; }
		[DataMember]
		public string AdministrativeDivision { get; set; }
	}
}
