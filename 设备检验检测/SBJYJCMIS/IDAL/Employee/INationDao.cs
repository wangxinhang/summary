using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.IDAL
{
    public interface INationDao
    {
        IList<NationInfo> GetNationNameList();//获取Nation列表

    }
}
