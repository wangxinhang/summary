using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [DataContract]
    public class RecordCountInfo
    {
        [DataMember]
        public int RecordCount   { get; set; }
   
        // <summary>
        /// Default constructor
        /// </summary> 
        public RecordCountInfo() { }
    }
}
