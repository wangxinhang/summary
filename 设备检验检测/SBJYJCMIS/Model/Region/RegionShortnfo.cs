using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [DataContract]
    public class RegionShortInfo
    {
        [DataMember]
        public int RowNumber { get; set; }
        [DataMember]
        public int Idd { get; set; }
        [DataMember]
        public string Id { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string ShortName { get; set; }
        [DataMember]
        public string ParentId { get; set; }
        [DataMember]
        public string Pinyin { get; set; }
		[DataMember]
		public decimal Longitude { get; set; }
		[DataMember]
		public decimal Latitude { get; set; }
    }
}
