const setConfigToday = () => {
  let today = new Date();
  let dataNow = {};
  let currentDates = {};
  dataNow.month = today.getMonth() + 1;
  dataNow.day = today.getDate();
  dataNow.year = today.getFullYear();
  dataNow.now = today.getHours();
  dataNow.min = today.getMinutes();
  currentDates.currentMonth = today.getMonth() + 1;
  currentDates.currentDay = today.getDate();
  currentDates.currentYear = today.getFullYear();
  return { dataNow, currentDates };
};

let calendarConfig = {
  totalDays: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  monthLabels: {
    long: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ],
    short: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez'
    ]
  },
  weekLabels: {
    long: [
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
      'Domingo'
    ],
    short: ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
    otherShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
  },
  configToday: setConfigToday(),
  timeLineConfig: {
    start: 7,
    end: 18,
    interval: 30
  },
  eventItem: {
    cod      : null,
    name     : null,
    start    : null,
    end      : null,
    type     : null,
    transport: null,
    status   : null,
    tara     : null
  }
};

export default { calendarConfig };
