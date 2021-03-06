const timePickerItems = [
  { key: '8:00', value: '8:00', text: '8:00' },
  { key: '8:05', value: '8:05', text: '8:05' },
  { key: '8:10', value: '8:10', text: '8:10' },
  { key: '8:15', value: '8:15', text: '8:15' },
  { key: '8:20', value: '8:20', text: '8:20' },
  { key: '8:25', value: '8:25', text: '8:25' },
  { key: '8:30', value: '8:30', text: '8:30' },
  { key: '8:35', value: '8:35', text: '8:35' },
  { key: '8:40', value: '8:40', text: '8:40' },
  { key: '8:45', value: '8:45', text: '8:45' },
  { key: '8:50', value: '8:50', text: '8:50' },
  { key: '8:55', value: '8:55', text: '8:55' },
  { key: '9:00', value: '9:00', text: '9:00' },
  { key: '9:05', value: '9:05', text: '9:05' },
  { key: '9:10', value: '9:10', text: '9:10' },
  { key: '9:15', value: '9:15', text: '9:15' },
  { key: '9:20', value: '9:20', text: '9:20' },
  { key: '9:25', value: '9:25', text: '9:25' },
  { key: '9:30', value: '9:30', text: '9:30' },
  { key: '9:35', value: '9:35', text: '9:35' },
  { key: '9:40', value: '9:40', text: '9:40' },
  { key: '9:45', value: '9:45', text: '9:45' },
  { key: '9:50', value: '9:50', text: '9:50' },
  { key: '9:55', value: '9:55', text: '9:55' },
  { key: '10:00', value: '10:00', text: '10:00' },
  { key: '10:05', value: '10:05', text: '10:05' },
  { key: '10:10', value: '10:10', text: '10:10' },
  { key: '10:15', value: '10:15', text: '10:15' },
  { key: '10:20', value: '10:20', text: '10:20' },
  { key: '10:25', value: '10:25', text: '10:25' },
  { key: '10:30', value: '10:30', text: '10:30' },
  { key: '10:35', value: '10:35', text: '10:35' },
  { key: '10:40', value: '10:40', text: '10:40' },
  { key: '10:45', value: '10:45', text: '10:45' },
  { key: '10:50', value: '10:50', text: '10:50' },
  { key: '10:55', value: '10:55', text: '10:55' },
  { key: '11:00', value: '11:00', text: '11:00' },
  { key: '11:05', value: '11:05', text: '11:05' },
  { key: '11:10', value: '11:10', text: '11:10' },
  { key: '11:15', value: '11:15', text: '11:15' },
  { key: '11:20', value: '11:20', text: '11:20' },
  { key: '11:25', value: '11:25', text: '11:25' },
  { key: '11:30', value: '11:30', text: '11:30' },
  { key: '11:35', value: '11:35', text: '11:35' },
  { key: '11:40', value: '11:40', text: '11:40' },
  { key: '11:45', value: '11:45', text: '11:45' },
  { key: '11:50', value: '11:50', text: '11:50' },
  { key: '11:55', value: '11:55', text: '11:55' },
  { key: '12:00', value: '12:00', text: '12:00' },
  { key: '12:05', value: '12:05', text: '12:05' },
  { key: '12:10', value: '12:10', text: '12:10' },
  { key: '12:15', value: '12:15', text: '12:15' },
  { key: '12:20', value: '12:20', text: '12:20' },
  { key: '12:25', value: '12:25', text: '12:25' },
  { key: '12:30', value: '12:30', text: '12:30' },
  { key: '12:35', value: '12:35', text: '12:35' },
  { key: '12:40', value: '12:40', text: '12:40' },
  { key: '12:45', value: '12:45', text: '12:45' },
  { key: '12:50', value: '12:50', text: '12:50' },
  { key: '12:55', value: '12:55', text: '12:55' },
  { key: '13:00', value: '13:00', text: '13:00' },
  { key: '13:05', value: '13:05', text: '13:05' },
  { key: '13:10', value: '13:10', text: '13:10' },
  { key: '13:15', value: '13:15', text: '13:15' },
  { key: '13:20', value: '13:20', text: '13:20' },
  { key: '13:25', value: '13:25', text: '13:25' },
  { key: '13:30', value: '13:30', text: '13:30' },
  { key: '13:35', value: '13:35', text: '13:35' },
  { key: '13:40', value: '13:40', text: '13:40' },
  { key: '13:45', value: '13:45', text: '13:45' },
  { key: '13:50', value: '13:50', text: '13:50' },
  { key: '13:55', value: '13:55', text: '13:55' },
  { key: '14:00', value: '14:00', text: '14:00' },
  { key: '14:05', value: '14:05', text: '14:05' },
  { key: '14:10', value: '14:10', text: '14:10' },
  { key: '14:15', value: '14:15', text: '14:15' },
  { key: '14:20', value: '14:20', text: '14:20' },
  { key: '14:25', value: '14:25', text: '14:25' },
  { key: '14:30', value: '14:30', text: '14:30' },
  { key: '14:35', value: '14:35', text: '14:35' },
  { key: '14:40', value: '14:40', text: '14:40' },
  { key: '14:45', value: '14:45', text: '14:45' },
  { key: '14:50', value: '14:50', text: '14:50' },
  { key: '14:55', value: '14:55', text: '14:55' },
  { key: '15:00', value: '15:00', text: '15:00' },
  { key: '15:05', value: '15:05', text: '15:05' },
  { key: '15:10', value: '15:10', text: '15:10' },
  { key: '15:15', value: '15:15', text: '15:15' },
  { key: '15:20', value: '15:20', text: '15:20' },
  { key: '15:25', value: '15:25', text: '15:25' },
  { key: '15:30', value: '15:30', text: '15:30' },
  { key: '15:35', value: '15:35', text: '15:35' },
  { key: '15:40', value: '15:40', text: '15:40' },
  { key: '15:45', value: '15:45', text: '15:45' },
  { key: '15:50', value: '15:50', text: '15:50' },
  { key: '15:55', value: '15:55', text: '15:55' },
  { key: '16:00', value: '16:00', text: '16:00' },
  { key: '16:05', value: '16:05', text: '16:05' },
  { key: '16:10', value: '16:10', text: '16:10' },
  { key: '16:15', value: '16:15', text: '16:15' },
  { key: '16:20', value: '16:20', text: '16:20' },
  { key: '16:25', value: '16:25', text: '16:25' },
  { key: '16:30', value: '16:30', text: '16:30' },
  { key: '16:35', value: '16:35', text: '16:35' },
  { key: '16:40', value: '16:40', text: '16:40' },
  { key: '16:45', value: '16:45', text: '16:45' },
  { key: '16:50', value: '16:50', text: '16:50' },
  { key: '16:55', value: '16:55', text: '16:55' },
  { key: '17:00', value: '17:00', text: '17:00' },
  { key: '17:05', value: '17:05', text: '17:05' },
  { key: '17:10', value: '17:10', text: '17:10' },
  { key: '17:15', value: '17:15', text: '17:15' },
  { key: '17:20', value: '17:20', text: '17:20' },
  { key: '17:25', value: '17:25', text: '17:25' },
  { key: '17:30', value: '17:30', text: '17:30' },
  { key: '17:35', value: '17:35', text: '17:35' },
  { key: '17:40', value: '17:40', text: '17:40' },
  { key: '17:45', value: '17:45', text: '17:45' },
  { key: '17:50', value: '17:50', text: '17:50' },
  { key: '17:55', value: '17:55', text: '17:55' },
  { key: '18:00', value: '18:00', text: '18:00' },
  { key: '18:05', value: '18:05', text: '18:05' },
  { key: '18:10', value: '18:10', text: '18:10' },
  { key: '18:15', value: '18:15', text: '18:15' },
  { key: '18:20', value: '18:20', text: '18:20' },
  { key: '18:25', value: '18:25', text: '18:25' },
  { key: '18:30', value: '18:30', text: '18:30' },
  { key: '18:35', value: '18:35', text: '18:35' },
  { key: '18:40', value: '18:40', text: '18:40' },
  { key: '18:45', value: '18:45', text: '18:45' },
  { key: '18:50', value: '18:50', text: '18:50' },
  { key: '18:55', value: '18:55', text: '18:55' },
  { key: '19:00', value: '19:00', text: '19:00' },
  { key: '19:05', value: '19:05', text: '19:05' },
  { key: '19:10', value: '19:10', text: '19:10' },
  { key: '19:15', value: '19:15', text: '19:15' },
  { key: '19:20', value: '19:20', text: '19:20' },
  { key: '19:25', value: '19:25', text: '19:25' },
  { key: '19:30', value: '19:30', text: '19:30' },
  { key: '19:35', value: '19:35', text: '19:35' },
  { key: '19:40', value: '19:40', text: '19:40' },
  { key: '19:45', value: '19:45', text: '19:45' },
  { key: '19:50', value: '19:50', text: '19:50' },
  { key: '19:55', value: '19:55', text: '19:55' },
  { key: '20:00', value: '20:00', text: '20:00' },
];

export default timePickerItems;
