export const roomBarChartData = {
  labels: ['NK', 'SNK', 'NQQ', 'SNQQ', 'SNKK', 'HQQ', 'Type1', 'Type2', 'Type3', 'Type4', 'Type5'],
  datasets: [
    {
      label: 'Occupied',
      data: [50, 60, 80, 100, 70, 60, 75, 80, 100, 60, 45],
      backgroundColor: '#005C84',
      stack: 'stack1',
      barThickness: 26,            // sets exact bar width (try 14–20 for slim)
      categoryPercentage: 0.75,     // reduces category width usage (default 0.8)
      barPercentage: 0.95           // adjusts how much of category space the bar uses

    },
    {
      label: 'Vacant',
      data: [50, 40, 20, 20, 30, 40, 25, 20, 20, 40, 55],
      backgroundColor: '#A2DBFA',
      stack: 'stack1',
      barThickness: 26,            // sets exact bar width (try 14–20 for slim)
      categoryPercentage: 0.75,     // reduces category width usage (default 0.8)
      barPercentage: 0.95           // adjusts how much of category space the bar uses

    },
  ],
};

export const roomPieChartData = {
  labels: ['Vacant Rooms', 'Occupied Rooms', 'Out of Order', 'Out of Inventory'],
  datasets: [
    {
      data: [24, 28, 2, 3],
      backgroundColor: ['#A2DBFA', '#005C84', '#FFB74D', '#EF5350'],
      hoverOffset: 4,
    },
  ],
};

export const roomSummary = {
  totalRooms: 80,
  vacant: 24,
  occupied: 28,
  outOfOrder: 2,
  outOfInventory: 3,
};
