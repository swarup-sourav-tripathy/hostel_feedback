"use client";
import { StarIcon } from "lucide-react";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { baseURL } from "@/constants";

// import { Calendar } from "@/components/ui/calendar"
import { Calendar } from "@nextui-org/calendar";
import { useMemo } from "react";
import { debounce } from "lodash";
import { today, getLocalTimeZone } from "@internationalized/date";
import { parseDate } from "@internationalized/date";
import type { DateValue } from "@react-types/calendar";
import { CalendarDate } from "@nextui-org/react";


interface HostelReview {
  _id: string;
  name: string;
  avgHygiene: number;
  avgFoodQuality: number;
  avgFoodQuantity: number;
  avgFoodTiming: number;
  avgMenuAdherence: number;
  avgStaffHygiene: number;
  avgTableCleanliness: number;
  avgStaffBehavior: number;
  avgPlateCleanliness: number;
  avgWaitingTime: number;
  createdAt: string;
  updatedAt: string;
  totalMark: number;
  __v: number;
  totalReviews: number;
}
function RatingBar({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
        <StarIcon
          key={star}
          className={`h-4 w-4 ${star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          fill={star <= rating ? "currentColor" : "none"}
        />
      ))}
      <span className="ml-2 text-sm font-medium text-black">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export default function HostelLanding() {
  const [hostelData, setHostelData] = useState<HostelReview[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

 
  const [cachedData, setCachedData] = useState<Record<string, HostelReview[]>>(
    {}
  );
  const defaultDate = today(getLocalTimeZone());
  let [focusedDate, setFocusedDate] = useState<DateValue>(defaultDate);

  console.log(focusedDate);
  console.log(defaultDate);

  const fetchData = useMemo(
    () =>
      debounce(async (date: DateValue) => {
        console.log(date);
        
        setLoading(true);
        const istOffset = 5.5 * 60 * 60 * 1000;
        
        let indianDate:any;
        if((date.day >= 1 && date.day < 10) && (date.month >= 1 && date.month < 10)){
          indianDate = `${date.year}-0${date.month}-0${date.day}`
        }else if(date.month >= 1 && date.month < 10){
          indianDate = `${date.year}-0${date.month}-${date.day}`
        }else if(date.day >= 1 && date.day < 10){
          indianDate = `${date.year}-${date.month}-0${date.day}`
        }else{
          indianDate = `${date.year}-${date.month}-${date.day}`
        }

        console.log(indianDate);
        


        if (cachedData[indianDate]) {
          setHostelData(cachedData[indianDate]);
          setLoading(false);
        } else {
          try {
            const response = await axios.get(
              `${baseURL}/api/feedback/getByDate?date=${indianDate}`
            );
            const data = response.data.data || [];
            console.log(response+"jd" || "dwj");
            
            setHostelData(data);
            setCachedData((prev) => ({ ...prev, [indianDate]: data }));
          } catch (error) {
            setHostelData([]);
          } finally {
            setLoading(false);
          }
        }
      }, 300),
    [cachedData]
  );
  
  
  
  useEffect(() => {

    fetchData(focusedDate);
  }, []);

  const calendar = useMemo(
    () => (
      <Calendar
        className="text-black"
        aria-label="Date  (Page Behaviour) (Show Month and Year Picker)  (Controlled Focused Value) (Max Date Value)"
        defaultValue={defaultDate}
        focusedValue={focusedDate}
        onFocusChange={setFocusedDate}
        onFocus={() => {fetchData(focusedDate)}}
        maxValue={today(getLocalTimeZone())}
        showMonthAndYearPickers
        pageBehavior="single" 
      />
    ),
    [defaultDate]
  );


  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Top Rated Hostels
        </h1>
        {calendar}

        <br/>

        {loading ? (
          <div className="text-center text-lg font-semibold text-gray-800 mt-8">
            Loading data...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hostelData.length > 0 ? (
              hostelData.map((hostel, index) => (
                <div
                  key={index}
                  className="bg-white relative rounded-lg shadow-md border border-gray-200 p-6 flex flex-col transition-all duration-300 ease-in-out hover:shadow-lg hover:border-gray-300"
                >
                  <div className="absolute top-4 right-4 bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold shadow-md">
                    {hostel.totalMark}
                  </div>

                  <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    {hostel.name}
                  </h2>
                  <p className="text-sm text-gray-600 mb-6">
                    <span className="font-medium">Total Reviews:</span>{" "}
                    {hostel.totalReviews}
                  </p>
                  <div className="space-y-4 mt-auto">

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        Hygiene:
                      </span>
                      <RatingBar rating={hostel.avgHygiene} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        Food Quality:
                      </span>
                      <RatingBar rating={hostel.avgFoodQuality} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        Food Quantity:
                      </span>
                      <RatingBar rating={hostel.avgFoodQuantity} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        Food Timing:
                      </span>
                      <RatingBar rating={hostel.avgFoodTiming} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        Menu Adherence:
                      </span>
                      <RatingBar rating={hostel.avgMenuAdherence} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        Staff Hygiene:
                      </span>
                      <RatingBar rating={hostel.avgStaffHygiene} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        Staff Behavior:
                      </span>
                      <RatingBar rating={hostel.avgStaffBehavior} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        Table Cleanliness:
                      </span>
                      <RatingBar rating={hostel.avgTableCleanliness} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        Plate Cleanliness:
                      </span>
                      <RatingBar rating={hostel.avgPlateCleanliness} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        Waiting Time:
                      </span>
                      <RatingBar rating={hostel.avgWaitingTime} />
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3">
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 text-center">
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">
                    No Reviews
                  </h2>
                  <p className="text-sm text-gray-600">
                    There are no reviews available for the selected date.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
