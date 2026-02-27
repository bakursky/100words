

"use client";

import { useMemo } from "react";
import { eachDayOfInterval, endOfMonth, format, isSameDay, parseISO, startOfMonth } from "date-fns";
import { useNotes } from "@/app/hooks/useNotes";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartPoint = {
  date: Date;
  dayLabel: string;
  words: number;
};

function countWords(text: string | null | undefined) {
  if (!text) return 0;
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

export default function Graph() {
  const { data: notes, isLoading } = useNotes();

  const data: ChartPoint[] = useMemo(() => {
    const today = new Date();
    const start = startOfMonth(today);
    const end = endOfMonth(today);

    const days = eachDayOfInterval({ start, end });

    return days.map((day) => {
      const wordsForDay =
        notes
          ?.filter((note) => {
            const noteDate = typeof note.note_date === "string" ? parseISO(note.note_date) : note.note_date;
            return isSameDay(noteDate, day);
          })
          .reduce((sum, note) => sum + countWords(note.decrypted_content), 0) ?? 0;

      return {
        date: day,
        dayLabel: format(day, "d"),
        words: wordsForDay,
      };
    });
  }, [notes]);

  const monthLabel = format(new Date(), "MMMM");

  return (
    <div className="component-bg w-full p-6 mb-24 mt-4">
      <div className="flex items-baseline justify-between mb-4">
        <div className="text-sm font-semibold text-neutral-400">{monthLabel}</div>
        <div className="text-xs text-neutral-500">Words per day</div>
      </div>

      <div className="h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="wordsArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#27272f" vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="dayLabel"
              tickLine={false}
              axisLine={{ stroke: "#3f3f46" }}
              tick={{ fill: "#a1a1aa", fontSize: 10 }}
              interval="preserveStartEnd"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#71717a", fontSize: 10 }}
              width={30}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ stroke: "#52525b", strokeWidth: 1 }}
              contentStyle={{
                backgroundColor: "#020617",
                border: "1px solid #27272f",
                borderRadius: "0.5rem",
                padding: "0.35rem 0.5rem",
              }}
              labelFormatter={(value) => `Day ${value}`}
              formatter={(value: number) => [`${value} words`, ""]}
            />

            <Area
              type="monotone"
              dataKey="words"
              stroke="none"
              fill="url(#wordsArea)"
              activeDot={false}
            />
            <Line
              type="monotone"
              dataKey="words"
              stroke="#f97316"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0, fill: "#fed7aa" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}