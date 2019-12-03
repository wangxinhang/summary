using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [DataContract]
    public class ResourceListInfo
    {
        [DataMember]
        public int RowNumber { get; set; }
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public int ResourceTypeId { get; set; }
        [DataMember]
        public string ResourceType { get; set; }
        [DataMember]
        public string ResourceObject { get; set; }
        [DataMember]
        public string Memo { get; set; }
   
        // <summary>
        /// Default constructor
        /// </summary> 
        public ResourceListInfo() { }
    }
}
