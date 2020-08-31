using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mega.Ticketing.Domain.Infrastructure
{
    public static class DateExtension
    {
        public static string ToPersianLong(this DateTime date, bool ContainsTime = false)
        {
            try
            {
                return PersianDate.GetDate(date).ToLongString() + " " + (ContainsTime ? date.ToString("HH:mm:ss") : "");
            }
            catch { return ""; }
        }
        public static string ToPersianShort(this DateTime date, bool ContainsTime = false)
        {
            try
            {
                return PersianDate.GetDate(date).ToShortString() + " " + (ContainsTime ? date.ToString("HH:mm:ss") : "");
            }
            catch { return ""; }
        }

        public static PersianDate ToPersian(this DateTime date)
        {
            try
            {
                return PersianDate.GetDate(date);
            }
            catch { return null; }
        }
    }

    public class PersianDate
    {

        public static string[] Months = new string[] { "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آیان", "آذر", "دی", "بهمن", "اسفند" };
        public static string[] Days = new string[] { "شنبه", "یکشنبه", "دوشنبه", "سه شنبه", "چهار شنبه", "پنج شنبه", "جمعه" };


        PersianCalendar pc = new PersianCalendar();

        public int Month { get; set; }
        public string MonthName
        {
            get
            {
                switch (Month)
                {
                    case 1: return "فروردین";
                    case 2: return "اردیبهشت";
                    case 3: return "خرداد";
                    case 4: return "تیر";
                    case 5: return "مرداد";
                    case 6: return "شهریور";
                    case 7: return "مهر";
                    case 8: return "آبان";
                    case 9: return "آذر";
                    case 10: return "دی";
                    case 11: return "بهمن";
                    case 12: return "اسفند";
                    default: return "";
                }
            }
        }
        public int Year { get; set; }
        public int DayOfWeekNumber
        {
            get
            {
                switch (pc.GetDayOfWeek(MiladyDate))
                {
                    case System.DayOfWeek.Friday:
                        return 7;
                    case System.DayOfWeek.Monday:
                        return 3;
                    case System.DayOfWeek.Saturday:
                        return 1;
                    case System.DayOfWeek.Sunday:
                        return 2;
                    case System.DayOfWeek.Thursday:
                        return 6;
                    case System.DayOfWeek.Tuesday:
                        return 4;
                    case System.DayOfWeek.Wednesday:
                        return 5;
                    default: return -1;
                }
            }
        }
        public int DayOfMonth { get; set; }
        public string DayOfWeek
        {
            get
            {
                switch (DayOfWeekNumber)
                {
                    case 1: return "شنبه";
                    case 2: return "یکشنبه";
                    case 3: return "دو شنبه";
                    case 4: return "سه شنبه";
                    case 5: return "چهار شنبه";
                    case 6: return "پنج شنبه";
                    case 7: return "جمعه";
                    default: return "";
                }
            }
        }

        public int WeekNumber
        {
            get
            {
                int WeekStart = DayOfMonth - DayOfWeekNumber;
                return ((WeekStart + MonthFirstDay.DayOfWeekNumber) / 7) + 1;

                //return ((WeekStart - 2 + MonthFirstDay.DayOfWeekNumber) / 7) + 1;
                ////if (WeekStart % 7 == 0)
                //if (WeekStart < 0 || WeekStart == 0) return 1;
                //else if (WeekStart <= 7)
                //    return 2;
                //else
                //    return WeekStart / 7 + 2;
                //else return (WeekStart / 7) + 1;
                //return ((DayOfMonth + baseNum) / 7) + 1;
                //int wk = ((DayOfMonth - (DayOfWeekNumber + 1)) / 7);
                //if (MonthFirstDay.DayOfWeekNumber == 1)
                //    return wk;
                //else return wk + 1;
            }
        }
        public bool IsHoliday { get { return (DayOfWeekNumber == 7 ? true : false); } }
        public bool YearIsLeap { get { return IsLeapYear(Year); } }
        public int MonthDays
        {
            get
            {
                if (Month < 7) return 31;
                else if (Month < 12) return 30;
                else if (YearIsLeap) return 30;
                else return 29;
            }
        }
        public PersianDate MonthFirstDay
        {
            get
            {
                PersianDate PD = new PersianDate();
                PD.PersianDateString = Year.ToString() + "/" + (Month < 10 ? "0" + Month.ToString() : Month.ToString()) + "/01";
                return PD;
            }
        }
        public PersianDate MonthLastDay
        {
            get
            {
                PersianDate PD = new PersianDate();
                PD.PersianDateString = Year.ToString() + "/" + (Month < 10 ? "0" + Month.ToString() : Month.ToString()) + "/" + MonthDays.ToString();
                return PD;
            }
        }
        DateTime _MiladyDate;
        public DateTime MiladyDate
        {
            get { return _MiladyDate; }
            set
            {
                _MiladyDate = value;
                Year = pc.GetYear(value);
                Month = pc.GetMonth(value);
                DayOfMonth = pc.GetDayOfMonth(value);

            }
        }
        public string PersianDateString
        {
            get
            {
                return ToShortString();
            }
            set
            {
                try
                {
                    string[] dates = value.Split('/');
                    int year = int.Parse(dates[0]);
                    int month = int.Parse(dates[1]);
                    int day = int.Parse(dates[2]);
                    MiladyDate = pc.ToDateTime(year, month, day, 0, 0, 0, 0);
                }
                catch
                {
                    //throw new Exception("Entered date is not a valid Jalali date");
                }
            }
        }

        bool IsLeapYear(int Fyear)
        {
            int TFy = Fyear + 38;
            TFy = TFy * 31;
            if ((TFy % 128) <= 30)
                return true;
            else
                return false;
        }

        public PersianDate() { }
        public PersianDate(DateTime date)
        {
            this.MiladyDate = date;
        }

        public static PersianDate GetDate(DateTime date)
        {
            try
            {
                return new PersianDate(date);
            }
            catch
            {
                return null;
            }
        }

        /// <summary>
        /// Return PersianDate object that bind from persian string date
        /// </summary>
        /// <param name="PersianStringDate">it must be complete like 1392/01/01 </param>
        /// <returns></returns>
        public static PersianDate GetDate(string PersianStringDate)
        {
            PersianDate PD = new PersianDate();
            PD.PersianDateString = PersianStringDate;
            return PD;
        }

        public string ToShortString()
        {
            return Year.ToString() + "/" + (Month < 10 ? "0" + Month.ToString() : Month.ToString()) + "/" + (DayOfMonth < 10 ? "0" + DayOfMonth.ToString() : DayOfMonth.ToString());
        }
        public string ToLongString()
        {
            return DayOfWeek + " " + DayOfMonth.ToString() + " " + MonthName + " " + Year.ToString();
        }

        public PersianDate AddDays(int count)
        {
            return PersianDate.GetDate(this.MiladyDate.AddDays(count));
        }
        public PersianDate AddMonths(int count)
        {
            return PersianDate.GetDate(this.MiladyDate.AddMonths(count));
        }
        public PersianDate AddYears(int count)
        {
            return PersianDate.GetDate(this.MiladyDate.AddYears(count));
        }
    }
}
