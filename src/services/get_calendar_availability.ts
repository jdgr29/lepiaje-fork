export async function get_calendar_availability(): Promise<{ from: string, to: string }[]> {
    const dateRanges = [
        { from: "Fri Jan 20 2025 00:00:00 GMT-0400 (Atlantic Standard Time)", to: "Sat Jan 21 2025 00:00:00 GMT-0400 (Atlantic Standard Time)" },
        { from: "Sun Jan 25 2025 00:00:00 GMT-0400 (Atlantic Standard Time)", to: "Thu Jan 30 2025 00:00:00 GMT-0400 (Atlantic Standard Time)" },
        { from: "Sat Jan 10 2025 00:00:00 GMT-0400 (Atlantic Standard Time)", to: "Wed Jan 29 2025 00:00:00 GMT-0400 (Atlantic Standard Time)" },
        { from: "Mon Jan 28 2025 00:00:00 GMT-0400 (Atlantic Standard Time)", to: "Tue Jan 29 2025 00:00:00 GMT-0400 (Atlantic Standard Time)" },
        { from: "Fri Jan 02 2025 00:00:00 GMT-0400 (Atlantic Standard Time)", to: "Sat Jan 03 2025 00:00:00 GMT-0400 (Atlantic Standard Time)" },
        { from: "Mon Jan 20 2025 00:00:00 GMT-0400 (Atlantic Standard Time)", to: "Sun Jan 26 2025 00:00:00 GMT-0400 (Atlantic Standard Time)" },
        { from: "Tue Jan 14 2025 00:00:00 GMT-0400 (Atlantic Standard Time)", to: "Fri Jan 17 2025 00:00:00 GMT-0400 (Atlantic Standard Time)" },
        { from: "Sun Jan 12 2025 00:00:00 GMT-0400 (Atlantic Standard Time)", to: "Thu Jan 16 2025 00:00:00 GMT-0400 (Atlantic Standard Time)" },
        { from: "Wed Jan 29 2025 00:00:00 GMT-0400 (Atlantic Standard Time)", to: "Fri Jan 31 2025 00:00:00 GMT-0400 (Atlantic Standard Time)" },
        { from: "Mon Jan 13 2025 00:00:00 GMT-0400 (Atlantic Standard Time)", to: "Wed Jan 15 2025 00:00:00 GMT-0400 (Atlantic Standard Time)" }
    ];

    return dateRanges;

}