function calculateBadges(number) {
    const badgeDurations = [
        { name: "3day", value: 3 },
        { name: "7day", value: 7 },
        { name: "10day", value: 10 },
        { name: "15day", value: 15 },
        { name: "20day", value: 20 },
        { name: "25day", value: 25 },
        { name: "30day", value: 30 }
    ];

    const badges = {};
    for (const badge of badgeDurations) {
        badges[badge.name] = number >= badge.value ? 1 : 0;
    }
    console.log(badges)
    return badges;
}
export default calculateBadges