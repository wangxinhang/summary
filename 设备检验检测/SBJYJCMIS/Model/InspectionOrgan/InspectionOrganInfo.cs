using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;


namespace SBJYJCMIS.Model
{
    [DataContract]
    public class InspectionOrganInfo:CommonInfo
    {
        [DataMember]
        public int RowNumber { get; set; }
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public int IsInner { get; set; }
        [DataMember]
        public string Tel { get; set; }
        [DataMember]
        public string Address { get; set; }
        [DataMember]
        public string Contact { get; set; }
        [DataMember]
        public string Qualification { get; set; }
        [DataMember]
        public int IsLocked { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string ShortName { get; set; }
        [DataMember]
        public string Area { get; set; }
        [DataMember]
        public string LockStatus { get; set; }
    }
}
