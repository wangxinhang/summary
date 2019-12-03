using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [DataContract]
    public class XmenuPageInfo : CommonInfo
    {
        [DataMember]
        public int XmenuId { get; set; }
        [DataMember]
        public int XpageId { get; set; }

        // <summary>
        /// Default constructor
        /// </summary> 
        public XmenuPageInfo() { }
    }
}
