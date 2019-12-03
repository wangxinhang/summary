using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    //[Serializable]
    [DataContract]
    public class NewContractSubtotalInfo
    {
        #region 属性字段
        [DataMember]
        public int RowNumber { get; set; }
        [DataMember]
        public string ID { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public decimal Amount { get; set; }
       
        [DataMember]
        public DateTime? Date { get; set; }
        [DataMember]
        public int Month { get; set; }
        [DataMember]
        public int Year { get; set; }
        [DataMember]
        public int DepartmentID { get; set; }
        [DataMember]
        public string Department { get; set; }
        [DataMember]
        public int ParentDepartmentID { get; set; }
        [DataMember]
        public string ParentDepartment { get; set; }
        [DataMember]
        public int GrandDepartmentID { get; set; }
        [DataMember]
        public string GrandDepartment { get; set; }
        [DataMember]
        public int EntrustingUnitID { get; set; }
        [DataMember]
        public string EntrustingUnit { get; set; }
        [DataMember]
        public string AdministrativeDivisionID { get; set; }
        [DataMember]
        public string AdministrativeDivision { get; set; }
        [DataMember]
        public int TelecomOperatorID { get; set; }
        [DataMember]
        public string TelecomOperator { get; set; }
       
        [DataMember]
        public int QuarterID { get; set; }
        [DataMember]
        public string Quarter { get; set; }
        [DataMember]
        public string DataType { get; set; }

        #endregion 属性字段
        // <summary>
        /// Default constructor
        /// </summary> 
        public NewContractSubtotalInfo() { }
    }
}
