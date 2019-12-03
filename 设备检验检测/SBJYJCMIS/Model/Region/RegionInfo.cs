using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace SBJYJCMIS.Model
{
	[DataContract]
	public class RegionInfo : CommonInfo
	{
        [DataMember]
        public int Idd { get; set; }
		[DataMember]
		public int RowNumber { get; set; }
		[DataMember]
		public string Id { get; set; }
		[DataMember]
		public string Name { get; set; }
		[DataMember]
		public string ShortName { get; set; }
		[DataMember]
		public string ParentId { get; set; }
        [DataMember]
        public int ParentIdd { get; set; }
        [DataMember]
		public int LevelType { get; set; }
		[DataMember]
		public string CityCode { get; set; }
		[DataMember]
		public string ZipCode { get; set; }
		[DataMember]
		public string Pinyin { get; set; }
		[DataMember]
		public decimal Longitude { get; set; }
		[DataMember]
		public decimal Latitude { get; set; }
		[DataMember]
		public string ExtendInfo { get; set; }
	}
}
