import './Calendario.css';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import localeEs from 'dayjs/locale/es'; 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';

dayjs.extend(isoWeek);
dayjs.locale(localeEs);
export const Calendario = ({onDate}) => { 
    const [selectedDate, setSelectedDate] = useState(null); // Estado para almacenar la fecha seleccionada

    const handleDateChange = (newValue) => {
        setSelectedDate(newValue);
        if (newValue) {
            const formattedDate = newValue.format("DD/MM/YYYY");
            console.log("Fecha seleccionada:", formattedDate); // Imprime la fecha en formato DD/MM/YYYY
            onDate(formattedDate); // Pasa la fecha formateada al callback
        } else {
            onDate(null); // Maneja el caso cuando no hay fecha seleccionada
        }
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                disablePast={true}
                 format="DD/MM/YYYY"
                 value={selectedDate}
                onChange={handleDateChange} 
            />
        </LocalizationProvider>
    );
};

