using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [Serializable]
    [DataContract]
    public class EmployeeViewInfo
    {
        #region 属性字段

        //基本属性
        [DataMember]
        public   int      RowNumber                        { get; set; }
        [DataMember]
        public   int      Id                               { get; set; }
        [DataMember]
        public   string   Name                             { get; set; }
        [DataMember]
        public   string   PinYin                           { get; set; }
        [DataMember]
        public   string   SimplePinYin                     { get; set; }
        [DataMember]
        public   int      Sex                              { get; set; }
        [DataMember]
        public   int      NationId                         { get; set; }
        [DataMember]
        public   int      MaritalStatus                    { get; set; }
        [DataMember]
        public   string   Tel                              { get; set; }
        [DataMember]
        public   string   Mobile                           { get; set; }
        [DataMember]
        public   string   OfficePhone                      { get; set; }
        [DataMember]
        public   string   Email                            { get; set; }
        [DataMember]
        public   string   Address                          { get; set; }
        [DataMember]
        public   string   IDNumber                         { get; set; }
        [DataMember]
        public   string   EmergencyMan                     { get; set; }
        [DataMember]
        public   string   EmergencyTel                     { get; set; }
        [DataMember]
        public   int      EducationId                      { get; set; }
        [DataMember]
        public   int      PositionId                       { get; set; }
        [DataMember]
        public   DateTime? CompanyTime                     { get; set; }
        [DataMember]
        public   int      DepartmentId                     { get; set; }
        [DataMember]
        public   int      EmployeeStatusId                 { get; set; }

        //扩展属性
        [DataMember]
        public   string   SexName                          { get; set; }
        [DataMember]
        public   string   Nation                           { get; set; }
        [DataMember]
        public   string   MaritalStatusName                { get; set; }
        [DataMember]
        public   string   Education                        { get; set; }
        [DataMember]
        public   string   Position                         { get; set; }
        [DataMember]
        public   string   Department                       { get; set; }
        [DataMember]
        public   string   EmployeeStatus                   { get; set; }
        [DataMember]
        public   string   Memo                             { get; set; }
        [DataMember]
        public   int      FlowNodeId                       { get; set; }
        [DataMember]
        public   string   FlowNode                         { get; set; }
        [DataMember]
        public   int      EmployeeId                       { get; set; }
        [DataMember]
        public   string   Employee                         { get; set; }
        [DataMember]
        public   int      ApprovalFlowNodeId               { get; set; }
        [DataMember]
        public   int      EmployeePositionLogIsExisted     { get; set; }
        [DataMember]
        public   int      EmployeeDepartmentLogIsExisted   { get; set; }

        #endregion 属性字段
    }
}
