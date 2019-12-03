using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;
using SBJYJCMIS.Model;

namespace SBJYJCMIS.BLL
{
    /// <summary>
    /// 泛型List实现排序
    /// 支持类型：Int16、Int32、Double、Decimal、DateTime、String；
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class SetSort<T> : IComparer<T>
    {
        public string SortField { get; set; }
        public string SortDirection { get; set; }
           
        public int Compare(T x, T y)
        {
            PropertyInfo property = typeof(T).GetProperty(SortField);

            //int16
            if (property.PropertyType == Type.GetType("System.Int16"))
            {
                int xNumber = 0;
                int yNumber = 0;
                if (property.GetValue(x, null) != null)
                {
                    xNumber = Convert.ToInt16(property.GetValue(x, null).ToString());
                }

                if (property.GetValue(y, null) != null)
                {
                    yNumber = Convert.ToInt32(property.GetValue(y, null).ToString());
                }
                return (SortDirection.ToUpper() == "ASC") ? xNumber.CompareTo(yNumber) : yNumber.CompareTo(xNumber);
            }

            //int32
            if (property.PropertyType == Type.GetType("System.Int32"))
            {
                int xNumber = 0;
                int yNumber = 0;
                if (property.GetValue(x, null) != null)
                {
                    xNumber = Convert.ToInt32(property.GetValue(x, null).ToString());
                }
                if (property.GetValue(y, null) != null)
                {
                    yNumber = Convert.ToInt32(property.GetValue(y, null).ToString());
                }
                return (SortDirection.ToUpper() == "ASC") ? xNumber.CompareTo(yNumber) : yNumber.CompareTo(xNumber);
            }

            //double
            if (property.PropertyType == Type.GetType("System.Double"))
            {
                double xNumber = 0;
                double yNumber = 0;
                if (property.GetValue(x, null) != null)
                {
                    xNumber = Convert.ToDouble(property.GetValue(x, null).ToString());
                }
                if (property.GetValue(y, null) != null)
                {
                    yNumber = Convert.ToDouble(property.GetValue(y, null).ToString());
                }
                return (SortDirection.ToUpper() == "ASC") ? xNumber.CompareTo(yNumber) : yNumber.CompareTo(xNumber);
            }

            //double
            if (property.PropertyType == Type.GetType("System.Decimal"))
            {
                decimal xNumber = 0;
                decimal yNumber = 0;
                if (property.GetValue(x, null) != null)
                {
                    xNumber = Convert.ToDecimal(property.GetValue(x, null).ToString());
                }
                if (property.GetValue(y, null) != null)
                {
                    yNumber = Convert.ToDecimal(property.GetValue(y, null).ToString());
                }
                return (SortDirection.ToUpper() == "ASC") ? xNumber.CompareTo(yNumber) : yNumber.CompareTo(xNumber);
            }

            //DateTime
            if (property.PropertyType == Type.GetType("System.DateTime"))
            {
                DateTime xTime = DateTime.Now;
                DateTime yTime = DateTime.Now;
                if (property.GetValue(x, null) != null)
                {
                    xTime = Convert.ToDateTime(property.GetValue(x, null));
                }
                if (property.GetValue(y, null) != null)
                {
                    yTime = Convert.ToDateTime(property.GetValue(y, null));
                }
                return (SortDirection.ToUpper() == "ASC") ? xTime.CompareTo(yTime) : yTime.CompareTo(xTime);
            }

            //
            if ((property.PropertyType == Type.GetType("System.String")) || (property.PropertyType == Type.GetType("System.Boolean")))
            {
                string xText = string.Empty;
                string yText = string.Empty;
                if (property.GetValue(x, null) != null)
                {
                    xText = property.GetValue(x, null).ToString();
                }
                if (property.GetValue(y, null) != null)
                {
                    yText = property.GetValue(y, null).ToString();
                }
                return (SortDirection.ToUpper() == "ASC") ? xText.CompareTo(yText) : yText.CompareTo(xText);
            }
            return 0;
        }        
    }
}
