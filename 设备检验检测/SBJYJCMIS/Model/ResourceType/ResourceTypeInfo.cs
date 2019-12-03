using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [DataContract]
    public class ResourceTypeInfo:CommonInfo
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string Name { get; set; }

        // <summary>
        /// Default constructor
        /// </summary> 
        public ResourceTypeInfo() { }
    }
}
