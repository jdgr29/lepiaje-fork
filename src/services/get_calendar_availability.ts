export async function get_calendar_availability(): Promise<{ from: string, to: string }[]> {
    const dateRanges = [
        { from: "Fri Jan 20 2025 00:00:00 GMT-0400 (Atlantic Standard Time)", to: "Sat Jan 21 2025 00:00:00 GMT-0400 (Atlantic Standard Time)" },
        { from: "Sun Jan 25 2025 00:00:00 GMT-0400 (Atlantic Standard Time)", to: "Thu Jan 30 2025 00:00:00 GMT-0400 (Atlantic Standard Time)" },

    ];

    return dateRanges;

}