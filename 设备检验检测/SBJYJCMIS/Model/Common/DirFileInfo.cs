using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Text;

namespace SBJYJCMIS.Model
{
    [DataContract]
    public class DirFileInfo
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string Name { get; set; }//文件夹或文件名称，没有路径。
        [DataMember]
        public string Path { get; set; }//目录或文件的相对路径：../Image/,../Image/a.png
        [DataMember]
        public int ParentId { get; set; }
        [DataMember]
        public int TypeId { get; set; }//1:文件夹，2：文件
        [DataMember]
        public string TypeName { get; set; }//1:文件夹，2：文件
   
        // <summary>
        /// Default constructor
        /// </summary> 
        public DirFileInfo() { }
    }
}
